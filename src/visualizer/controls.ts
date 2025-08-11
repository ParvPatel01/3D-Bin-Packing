import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { camera } from './camera';
import { renderer } from './renderer';

export const controls = new TrackballControls(camera, renderer.domElement);

