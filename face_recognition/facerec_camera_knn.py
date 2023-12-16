"""
This is an example of using the k-nearest-neighbors (KNN) algorithm for face recognition.

When should I use this example?
This example is useful when you wish to recognize a large set of known people,
and make a prediction for an unknown person in a feasible computation time.

Algorithm Description:
The knn classifier is first trained on a set of labeled (known) faces and can then predict the person
in a live stream by finding the k most similar faces (images with closet face-features under euclidean distance)
in its training set, and performing a majority vote (possibly weighted) on their label.

For example, if k=3, and the three closest face images to the given image in the training set are one image of Biden
and two images of Obama, The result would be 'Obama'.

* This implementation uses a weighted vote, such that the votes of closer-neighbors are weighted more heavily.

Usage:

1. Prepare a set of images of the known people you want to recognize. Organize the images in a single directory
   with a sub-directory for each known person.

2. Then, call the 'train' function with the appropriate parameters. Make sure to pass in the 'model_save_path' if you
   want to save the model to disk so you can re-use the model without having to re-train it.

3. Call 'predict' and pass in your trained model to recognize the people in a live video stream.

NOTE: This example requires scikit-learn, opencv and numpy to be installed! You can install it with pip:

$ pip3 install scikit-learn
$ pip3 install numpy
$ pip3 install opencv-contrib-python

"""

import cv2
import pickle
from PIL import Image, ImageDraw
import face_recognition
import numpy as np
from gpiozero import Button, Buzzer
import time
import voice
import monitor
from mongodb import getUsername
import RPi.GPIO as GPIO
# GPIO in raspberry pi
RELAY = 17
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY, GPIO.OUT)
GPIO.output(RELAY,GPIO.LOW)
# for control gpio
SW1 = Button(21)
SW2 = Button(16)
SW3 = Button(20)
BUZZER = Buzzer(26)

# for cloudinary
import cloudinary
# Import the cloudinary.api for managing assets
import cloudinary.api
# Import the cloudinary.uploader for uploading assets
import cloudinary.uploader
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'JPG'}
cloudinary.config(
    cloud_name="dkjd1omoz",
    api_key="668941927865965",
    api_secret="Ne6WXHNT0T-3ia52vnKiIjd6It8",
    secure=True,
)

# for database
from pymongo import MongoClient
uri = "mongodb+srv://thaole04:041003@facerecognition.tcpw49j.mongodb.net/?retryWrites=true&w=majority"

# def active buzzer and LED
def notice():
    BUZZER.on()
    time.sleep(0.2)
    BUZZER.off()


def predict(X_frame, knn_clf=None, model_path=None, distance_threshold=0.45):
    """
    Recognizes faces in given image using a trained KNN classifier

    :param X_frame: frame to do the prediction on.
    :param knn_clf: (optional) a knn classifier object. if not specified, model_save_path must be specified.
    :param model_path: (optional) path to a pickled knn classifier. if not specified, model_save_path must be knn_clf.
    :param distance_threshold: (optional) distance threshold for face classification. the larger it is, the more chance
           of mis-classifying an unknown person as a known one.
    :return: a list of names and face locations for the recognized faces in the image: [(name, bounding box), ...].
        For faces of unrecognized persons, the name 'unknown' will be returned.
    """
    if knn_clf is None and model_path is None:
        raise Exception("Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None:
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)

    X_face_locations = face_recognition.face_locations(X_frame)

    # If no faces are found in the image, return an empty result.
    if len(X_face_locations) == 0:
        return []

    # Find encodings for faces in the test image
    faces_encodings = face_recognition.face_encodings(X_frame, known_face_locations=X_face_locations)

    # Use the KNN model to find the best matches for the test face
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors = 1)
    are_matches = [closest_distances[0][i][0] <= distance_threshold for i in range(len(X_face_locations))]

    # Predict classes and remove classifications that aren't within the threshold
    return [(pred, loc) if rec else ("unknown", loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]

# Show predicttion label for display in monitor
def show_prediction_labels_on_image(frame, predictions):
    """
    Shows the face recognition results visually.

    :param frame: frame to show the predictions on
    :param predictions: results of the predict function
    :return opencv suited image to be fitting with cv2.imshow fucntion:
    """
    pil_image = Image.fromarray(frame)
    draw = ImageDraw.Draw(pil_image)

    for name, (top, right, bottom, left) in predictions:
        # enlarge the predictions for the full sized image.
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4
        # Draw a box around the face using the Pillow module
        draw.rectangle(((left, top), (right, bottom)), outline=(0, 0, 255))

        # There's a bug in Pillow where it blows up with non-UTF-8 text
        # when using the default bitmap font
        name = name.encode("UTF-8")

        # Draw a label with a name below the face
        # text_width, text_height = draw.textsize(name)
        text_height = 30 
        draw.rectangle(((left, bottom - text_height - 10), (right, bottom)), fill=(0, 0, 255), outline=(0, 0, 255))
        draw.text((left + 6, bottom - text_height - 5), name, fill=(255, 255, 255, 255))

    # Remove the drawing library from memory as per the Pillow docs.
    del draw
    # Save image in open-cv format to be able to show it.

    opencvimage = np.array(pil_image)
    return opencvimage

voice_enable = True
prevTime = 0
statusMonitor = False

if __name__ == "__main__":
    print('Press button following this manual:')
    print('1. Press button 1 to active face recognition function.')
    print('2. Press button 2 to update face recognition system.')
    print('3. Press button 3 to toogle voice mode.')
    # get dict Name of users
    list_usernames = getUsername()
    # connect to mongodb
    client = MongoClient(uri)
    db = client['mydatabase']
    activities = db["activities"]
    monitor.manual(voice_enable)
    while True:
        if SW1.is_pressed:
            try: 
                classifier = pickle.load(open("trained_knn_model.clf", 'rb'))
                print("Load complete!")
            except:
                print("Error while loading model!")
            # process one frame in every 30 frames for speed
            process_this_frame = 29
            cap = cv2.VideoCapture(0)
            monitor.clear()
            monitor.write("Đang nhận", 0)
            monitor.write("diện khuôn", 16)
            monitor.write("mặt...", 32)
            while True:
                ret, frame = cap.read()
                if ret:
                    # Different resizing options can be chosen based on desired program runtime.
                    # Image resizing for more stable streaming
                    img = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
                    process_this_frame = process_this_frame + 1
                    if process_this_frame % 30 == 0:
                        predictions = predict(img, model_path="trained_knn_model.clf")
                        if (predictions != []):
                            print(predictions)
                            try:
                                # save img to folder knn_folder/activities with name is HH_MM_SS_DD_MM_YY.jpg
                                cv2.imwrite("knn_folder/activities/"+time.strftime("%H_%M_%S_%d_%m_%Y")+".jpg", frame)
                                # save img to cloudinary
                                response = cloudinary.uploader.upload(
                                    "knn_folder/activities/"+time.strftime("%H_%M_%S_%d_%m_%Y")+".jpg", 
                                    folder = "activities",
                                    public_id = time.strftime("%H_%M_%S_%d_%m_%Y"),
                                )
                                secured = False
                                username_get = []
                                for prediction in predictions:
                                    if prediction[0] != "unknown":
                                        secured = True
                                        break;
                                if secured:
                                    GPIO.output(RELAY,GPIO.HIGH)
                                for prediction in predictions:
                                    # create data to insert in mongodb
                                    data = {
                                        "time": time.strftime("%H-%M-%S"),
                                        "date": time.strftime("%d-%m-%Y"),
                                        "username": prediction[0],
                                        "image": response['secure_url'],
                                        "secured": secured
                                    }
                                    username_get.append(prediction[0])
                                    # insert data to collection activities
                                    activities.insert_one(data)
                                    print("Success!")
                                prevTime = time.time()
                                statusMonitor = True
                                index_from_top = 0;
                                monitor.clear()
                                for username_single in username_get:
                                    if username_single == "unknown":
                                        monitor.write("Unknown", index_from_top)
                                        index_from_top = index_from_top + 16
                                        if voice_enable:
                                            if secured:
                                                voice.speak("Có một người lạ được vào nhà")
                                            else:
                                                voice.speak("Bạn không được phép vào nhà")
                                    else:
                                        monitor.write(list_usernames[username_single], index_from_top)
                                        index_from_top = index_from_top + 16
                                        if voice_enable:
                                            voice.speak("Chào bạn " + list_usernames[username_single])
                                # notice
                                notice()
                                cap.release()
                                break;
                            except:
                                print("Error!")
                                notice()
                                cap.release()
                                break;
        elif SW2.is_pressed:
            if voice_enable:
                voice_enable = False
            else:
                voice_enable = True
            monitor.manual(voice_enable)
        elif SW3.is_pressed:
            monitor.clear()
            # exit program
            print("Exiting Program and cleanup stuff")
            if voice_enable:
                voice.speak("Tạm biệt")
            GPIO.cleanup()
            exit()
        else:
            if statusMonitor:
                if time.time() - prevTime > 3:
                    GPIO.output(RELAY,GPIO.LOW)
                    statusMonitor = False
                    monitor.manual(voice_enable)
            pass

