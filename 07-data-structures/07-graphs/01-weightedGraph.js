const { PriorityQueue } = require('../05-heaps/01-priorityQueue');

class WeightedGraph {
  constructor() {
    this.adjList = {};
  }

  addVertex(data) {
    if (!this.adjList[data]) {
      this.adjList[data] = [];
    }

    return this;
  }

  // each vertex in the adjList will have
  // neighbours such as:
  // { "A": [ 
  //   { name: "B", weight: 10 } 
  // ] }
  addEdge(vtx1, vtx2, weight) {
    const list = this.adjList;

    if (!list[vtx1] || !list[vtx2]) return false;

    list[vtx1].push({ name: vtx2, weight });
    list[vtx2].push({ name: vtx1, weight });

    return this;
  }

  // find the shortest path between two vertices
  // using Dijkstra's algorithm
  findShortestPath(fromVtx, toVtx) {
    const list = this.adjList;

    if (
      !fromVtx ||
      !toVtx ||
      !list[fromVtx] ||
      !list[toVtx]
    ) return null;

    const distances = {},
          prevRecord = {},
          vtxQueue = new PriorityQueue();

    const result = {
      'distance': null,
      'path': [toVtx]
    };

    for (let v in list) {
      if (v === fromVtx) {
        distances[v] = 0;
        vtxQueue.enqueue(v, 0);
      } else {
        distances[v] = Infinity;
        vtxQueue.enqueue(v, Infinity);
      }

      prevRecord[v] = null;
    }

    while (!vtxQueue.isEmpty()) {
      const current = vtxQueue.dequeue().val; 

      if (current === toVtx) break;
      
      for (let item of list[current]) {
        let distance = item['weight'] + distances[current];
        
        if (distance < distances[item['name']]) {
          distances[item['name']] = distance;
          prevRecord[item['name']] = current;
          vtxQueue.enqueue(item['name'], distance);
        }
      }
    }

    result['distance'] = distances[toVtx];

    let prev = prevRecord[toVtx];

    while (prev) {
      result['path'].unshift(prev);
      prev = prevRecord[prev];
    }

    return result;
  }
}

module.exports = WeightedGraph;