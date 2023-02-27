type Edge = {
  target: string;
  source: string;
}

export const findLongest_v1 = (
  current: string | number,
  edges: Edge[],
): number => {
  console.time('lookup')
  const edgeLookup = edges.reduce(
    (memo, ed) => ({
      ...memo,
      [ed.source]: {
        max: 0,
        next: [...(memo[ed.source]?.next || []), ed.target],
      },
    }),
    {} as Record<string, { max: number; next: string[] }>,
  );
  const max = Object.keys(edgeLookup).length;
  console.timeEnd('lookup')

  console.time('bfs')
  let temp = [current];
  while (temp.length > 0) {
    const [target, ...rest] = temp;
    const ed = edgeLookup[target];
    temp = rest;
    // eslint-disable-next-line no-continue
    if (!ed) continue;
    if (ed.max === max) break;
    temp = [...rest, ...ed.next];
    ed.next.forEach((id) => {
      edgeLookup[id] ||= { max: 0, next: [] };
      edgeLookup[id].max = Math.max(edgeLookup[id]?.max, ed.max + 1);
    });
  }
  console.timeEnd('bfs')

  return Math.max(...Object.values(edgeLookup).map((x) => x.max), 0);
};

export const findLongest_v2 = (
  current: string | number,
  edges: Edge[],
): number => {
  console.time('lookup')
  const edgeLookup = edges.reduce((memo, ed) => {
    // eslint-disable-next-line no-param-reassign
    memo[ed.source] = {
      max: 0,
      next: [...(memo[ed.source]?.next || []), ed.target],
    };
    return memo;
  }, {} as Record<string, { max: number; next: string[] }>);
  const max = Object.keys(edgeLookup).length;
  console.timeEnd('lookup')

  console.time('bfs')
  let temp = [current];
  while (temp.length > 0) {
    const target = temp.shift();
    const ed = edgeLookup[target as string];
    // eslint-disable-next-line no-continue
    if (!ed) continue;
    if (ed.max === max) break;
    temp = temp.concat(ed.next);
    ed.next.forEach((id) => {
      edgeLookup[id] ||= { max: 0, next: [] };
      edgeLookup[id].max = Math.max(edgeLookup[id]?.max, ed.max + 1);
    });
  }
  console.timeEnd('bfs')
  return Math.max(...Object.values(edgeLookup).map((x) => x.max), 0);
};

export const findLongest_v3 = (
  current: string | number,
  edges: Edge[],
): number => {
  console.time('lookup')
  const edgeLookup = edges.reduce((memo, ed) => {
    // eslint-disable-next-line no-param-reassign
    memo[ed.source] ||= { max: 0, next: [] };
    memo[ed.source].next.push(ed.target);
    return memo;
  }, {} as Record<string, { max: number; next: string[] }>);
  const max = Object.keys(edgeLookup).length;
  console.timeEnd('lookup')

  console.time('bfs')
  let temp = [current];
  while (temp.length > 0) {
    const target = temp.shift();
    const ed = edgeLookup[target as string];
    // eslint-disable-next-line no-continue
    if (!ed) continue;
    if (ed.max === max) break;
    temp = temp.concat(ed.next);
    ed.next.forEach((id) => {
      edgeLookup[id] ||= { max: 0, next: [] };
      edgeLookup[id].max = Math.max(edgeLookup[id]?.max, ed.max + 1);
    });
  }
  console.timeEnd('bfs')
  return Math.max(...Object.values(edgeLookup).map((x) => x.max), 0);
};

export const findLongest_v4 = (
  current: string | number,
  edges: Edge[],
): number => {
  console.time('lookup')
  const reverseNode: Record<string, string[]> = {};
  const lookup: Record<string, string[]> = {};
  edges.forEach((ed) => {
    lookup[ed.source] ||= [];
    lookup[ed.target] ||= [];
    lookup[ed.source].push(ed.target);
    reverseNode[ed.target] ||= [];
    reverseNode[ed.target].push(ed.source);
  });
  const stopMax = Object.keys(lookup).length;
  const temp = Object.keys(lookup).filter((id) => lookup[id].length === 0);
  const maxMap: Record<string, number> = {};
  console.timeEnd('lookup')

  console.time('bfs')
  while (temp.length > 0) {
    const parent = temp.shift() as string;
    const dest = reverseNode[parent];
    // eslint-disable-next-line no-continue
    if (!dest?.length) continue;
    const cur = Math.min(stopMax, (maxMap[parent] || 0) + 1);
    dest.forEach((id) => {
      if (cur > (maxMap[id] || 0)) {
        maxMap[id] = cur;
        if (reverseNode[id]) {
          temp.push(id);
        }
      }
    });
  }
  console.timeEnd('bfs')
  return maxMap[String(current)] || 0;
};