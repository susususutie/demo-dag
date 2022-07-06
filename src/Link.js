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
    const deepMap = new WeakMap();
    let deep = 0;

    // TODO 广度优先算法获得排序
    // start -> a -> ... -> end
    // ji
    this.longestPath();
  }

  // deepFirstSearch
  DFS(callback) {
    let list = [];

    if (this.nodes) {
      var stack = [];
      stack.push(this.headNode);

      while (stack.length !== 0) {
        const node = stack.pop();

        list.push(node);
        callback(node);

        const children = item.nexts;
        for (let index = children.length - 1; index >= 0; index--) {
          const nextNode = children[index];
          stack.push(nextNode);
        }
      }
    }

    return list;
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
    console.log(matrix)
  }
}
