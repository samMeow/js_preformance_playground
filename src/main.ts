import edges from './edges.json';
import {
  findLongest_v1,
  findLongest_v2,
  findLongest_v3,
  findLongest_v4,
} from './graph';

const app = document.getElementById('app');
const timeDiv = document.getElementById('time');
app?.querySelector('#button-group')?.addEventListener('click', (e) => {
  const cur = e.target as HTMLElement;
  const id = cur.getAttribute('id');
  const lookup = {
    v1: findLongest_v1,
    v2: findLongest_v2,
    v3: findLongest_v3,
    v4: findLongest_v4,
  };
  const start = window.performance.now();
  console.time('func')
  lookup[id as string]('startPoint', edges);
  console.timeEnd('func');
  const time = window.performance.now() - start;
  timeDiv!.innerText = `${time}ms`;
})