import RPi.GPIO as GPIO
from time import sleep
import monitor
RELAY_PIN = 17

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT)

try:
    while (True):
        print("Turning on...")
        monitor.clear()
        monitor.write("Turning on...",0)
        GPIO.output(RELAY_PIN, 1)
        sleep(1)
        monitor.clear()
        monitor.write("Turning off...",0)
        print("Turning off...")
        GPIO.output(RELAY_PIN, 0)
        sleep(1)
finally:
    GPIO.cleanup()
