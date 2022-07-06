class Node {
  constructor(node, nexts, prevs) {
    this.value = node;
    this.prevs = prevs;
    this.nexts = nexts;
  }

  #addPointer(type, value) {
    if (!["prevs", "nexts"].includes(type)) {
      return;
    }

    this[type] = this[type] || [];
    if (value && !this[type].includes(value)) {
      this[type].push(value);
    }
  }

  addPrev(prev) {
    this.#addPointer("prevs", prev);
  }

  addNext(next) {
    this.#addPointer("nexts", next);
  }
}

export class Link {
  constructor(options) {
    if (options && options.nodes && options.edges) {
      this.parseFromX6(options.nodes, options.edges);
    }
  }

  parseFromX6(nodes, edges) {
    this.nodes = new Map();
    this.start = undefined;
    this.end = undefined;

    const inZeroNodes = new Set(); // 入度为0的节点
    const outZeroNodes = new Set(); // 出度为0的节点

    for (let index = 0; index < nodes.length; index++) {
      const node = new Node(nodes[index]);
      this.nodes.set(node.value.id, node);

      inZeroNodes.add(node);
      outZeroNodes.add(node);
    }

    for (let index = 0; index < edges.length; index++) {
      const { source, target } = edges[index];
      const sourceNode = this.nodes.get(source);
      const targetNode = this.nodes.get(target);
      sourceNode.addNext(targetNode);
      targetNode.addPrev(sourceNode);

      inZeroNodes.delete(targetNode);
      outZeroNodes.delete(sourceNode);
    }

    this.start = [...inZeroNodes][0];
    this.end = [...outZeroNodes][0];
  }

  layout() {
    // 每一个节点的最大深度, 即col
    const nodeDeepMap = this.getDeepMap();

    // 每个深度有多少个节点, 即 row
    // const deepNodeMap = new Map();
    // [...this.nodes.values()].forEach((node) => {
    //   const deep = nodeDeepMap.get(node);
    //   if (!deepNodeMap.has(deep)) {
    //     deepNodeMap.set(deep, []);
    //   }
    //   deepNodeMap.get(deep).push(node);
    // });

    this.DFS();
    console.log(this.router);
  }

  /**
   *
   */
  getDeepMap() {
    const deepMap = new WeakMap();

    let index = 0;
    let currentDeepNodes = [this.start];

    while (currentDeepNodes.length) {
      const nextDeepNodes = [];
      currentDeepNodes.forEach((current) => {
        deepMap.set(current, Math.max(index, deepMap.get(current) || 0));
        if (current.nexts) {
          nextDeepNodes.push(...current.nexts);
        }
      });

      index += 1;
      currentDeepNodes = nextDeepNodes;
    }

    return deepMap;
  }

  // deepFirstSearch
  DFS(callback, startFrom = this.start) {
    let list = [];

    if (this.nodes) {
      let stack = [];
      stack.push(startFrom);

      while (stack.length !== 0) {
        const node = stack.pop();

        list.push(node);
        typeof callback === "function" && callback(node);

        const children = node.nexts;
        if (children) {
          for (let index = children.length - 1; index >= 0; index--) {
            const nextNode = children[index];
            if (nextNode === this.end) {
              // touch end
              this.router = (this.router || 0) + 1;
            }
            if (!list.includes(nextNode)) {
              stack.push(nextNode);
            }
          }
        }
      }
    }

    return list;
  }

  static Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
  };

  initializeColor() {
    const color = new WeakMap();
    [...this.nodes.values()].forEach((v) => color.set(v, Link.Colors.WHITE));
    return color;
  }

  BFS(callback, startVertex = this.start) {
    debugger;
    const stateMap = this.initializeColor();
    let queue = [];

    queue.push(startVertex);

    while (queue.length !== 0) {
      let node = queue.shift();
      node.nexts.forEach((n) => {
        if (stateMap.get(n) === Link.Colors.WHITE) {
          stateMap.set(n, Link.Colors.GREY);
          queue.push(n);
        }
      });

      stateMap.set(node, Link.Colors.BLACK);
      if (callback) callback(node);
    }
  }

  // 最长路径
  longestPath() {
    const size = this.nodes.size;
    // Start A  B  C  D  End
    // [
    //   [0, 0, 0, 0, 0, 0], // Start
    //   [0, 0, 0, 0, 0, 0], // A
    //   [0, 0, 0, 0, 0, 0], // B
    //   [0, 0, 0, 0, 0, 0], // C
    //   [0, 0, 0, 0, 0, 0], // D
    //   [0, 0, 0, 0, 0, 0], // End
    // ]

    const matrix = Array.from({ length: size }, () => new Array(size).fill(0));

    for (let index = 0; index < matrix.length; index++) {
      const row = matrix[index];
      for (let j = 0; j < row.length; j++) {
        const col = row[j];
      }
    }
    console.log(matrix);
  }
}
