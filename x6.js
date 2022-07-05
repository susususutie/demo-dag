import { Graph } from "@antv/x6";

const data = {
  // 节点
  nodes: [
    {
      id: "start",
      x: 20,
      y: 150,
      width: 80,
      height: 40,
      label: "开始",
    },
    {
      id: "1",
      x: 160,
      y: 40,
      width: 120,
      height: 40,
      label: "1",
    },
    {
      id: "2",
      x: 160,
      y: 120,
      width: 40,
      height: 40,
      label: "2",
    },
    {
      id: "3",
      x: 300,
      y: 120,
      width: 60,
      height: 40,
      label: "3",
    },
    {
      id: "4",
      x: 160,
      y: 240,
      width: 120,
      height: 40,
      label: "4",
    },
    {
      id: "5",
      x: 400,
      y: 200,
      width: 40,
      height: 40,
      label: "5",
    },
    {
      id: "6",
      x: 400,
      y: 300,
      width: 60,
      height: 40,
      label: "6",
    },
    {
      id: "end",
      x: 600,
      y: 150,
      width: 60,
      height: 40,
      label: "结束",
    },
  ],
  // 边
  edges: [
    {
      source: "start",
      target: "1",
    },
    {
      source: "1",
      target: "end",
    },

    {
      source: "start",
      target: "2",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "3",
      target: "end",
    },

    {
      source: "start",
      target: "4",
    },
    {
      source: "4",
      target: "5",
    },
    {
      source: "4",
      target: "6",
    },
    {
      source: "5",
      target: "end",
    },
    {
      source: "6",
      target: "end",
    },
  ],
};

const graph = new Graph({
  container: document.getElementById("app"),
  width: 800,
  height: 600,
  background: {
    color: "#fffbe6", // 设置画布背景颜色
  },
  grid: {
    size: 10, // 网格大小 10px
    visible: true, // 渲染网格背景
  },
});

graph.fromJSON(data);
