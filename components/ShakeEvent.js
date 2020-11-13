import { Accelerometer } from 'expo-sensors';

const THRESHOLD = 150;
export class ShakeEvent {

  static addListener(handler) {
  let last_x, last_y, last_z;
    let lastUpdate = 0;

    Accelerometer.addListener(accelerometerData => {
      let { x, y, z } = accelerometerData;
      let currentTime = Date.now();

      if ((currentTime - lastUpdate) > 100) {
        let diffTime = (currentTime - lastUpdate);
        lastUpdate = currentTime;
        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > THRESHOLD) {
          handler();
        }

        last_x = x;
        last_y = y;
        last_z = z;
      }
    });
  }
  static removeListener() {
    Accelerometer.removeAllListeners()
  }
};