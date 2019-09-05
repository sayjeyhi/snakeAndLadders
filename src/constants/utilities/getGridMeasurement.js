import { window } from 'browser-monads';

/**
 * Get grids measurement to make responsive rects
 * @param width
 * @param height
 * @returns {number}
 */
export default function getGridMeasurement(width, height) {
  let gutter = 32;
  width = typeof width === 'undefined' ? window.outerWidth : width;
  height =
    typeof height === 'undefined' ? window.outerHeight - 70 : height - 50;

  if (height > 350) {
    height -= 50;
  }

  // choose height or width based on greater one
  let usedMeasurement = width;
  if (width > height) {
    usedMeasurement = height;
  }

  if (usedMeasurement > 1000) {
    gutter = 100;
  } else if (usedMeasurement <= 1000 && usedMeasurement > 700) {
    gutter = 80;
  } else if (usedMeasurement <= 700 && usedMeasurement > 600) {
    gutter = 70;
  } else if (usedMeasurement <= 600 && usedMeasurement > 400) {
    gutter = 50;
  } else {
    gutter = 10;
  }
  const finalMeasurement = usedMeasurement - gutter;

  console.log(finalMeasurement);
  // check minimum measurement
  return finalMeasurement > 300 ? finalMeasurement : 300;
}
