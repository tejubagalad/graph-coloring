# Graph Coloring Visualizer 🎨

The Graph Coloring Visualizer is an interactive web application designed to demonstrate and compare various graph coloring algorithms. It provides a hands-on environment where users can create their own graphs and visualize how different heuristic strategies tackle the NP-hard problem of graph coloring in real-time. The application is built with **React** and uses **SVG** for all rendering, ensuring it has no external graphing library dependencies.

## ✨ Key Features

- **Interactive Graph Editor**: Users can dynamically create their own graphs by clicking to add nodes and connect them with edges, offering a fully custom experimental setup.
- **Side-by-Side Comparison**: Add multiple algorithm visualizers to the screen at once to directly compare their processes and results on the same graph.
- **Multiple Heuristics Implemented**:
  - **Greedy Coloring**: A straightforward approach based on a fixed node order.
  - **Welsh-Powell**: A greedy algorithm that prioritizes nodes with the highest degree.
  - **DSATUR**: A more advanced heuristic that dynamically selects nodes based on the number of colored neighbors (saturation degree).
- **Detailed Step-by-Step Animation**: Visualize every step of an algorithm's decision-making process, including focusing on a node, highlighting its neighbors to check for conflicts, and finally assigning a color.
- **Dynamic Time Complexity Calculation**: Each visualizer displays both the theoretical time complexity and a calculated complexity based on the current graph's number of vertices (V) and edges (E).
- **Dependency-Free Rendering**: All graph visualizations are rendered using SVG, removing the need for external libraries and ensuring maximum compatibility.

## ⚙️ Technology Stack

- **Frontend**: React.js (bootstrapped with Vite)
- **Rendering**: SVG (Scalable Vector Graphics)
- **Styling**: CSS

## 🚀 How It Works

1.  **Initial State**: The application loads with a default example graph designed to highlight the differences between the algorithms.
2.  **Graph Creation**: The user can clear the default graph and use the **Graph Editor** to design their own from scratch.
    - Click on the background to add a node at that position.
    - Toggle the "Add Edges" button. Click on two nodes sequentially to connect them.
3.  **Algorithm Selection**: Below the editor, the user can click buttons to add visualizer cards for any of the available algorithms to the workspace.
4.  **Visualization**:
    - Each algorithm card displays a static copy of the graph from the editor.
    - The user can use the animation controls (▶️ Play, ⏸️ Pause, ⏭️ Step Forward, etc.) to watch the coloring process unfold.
    - The status message at the bottom of each card explains the current action being taken by the algorithm.
5.  **Analysis**: By adding multiple cards, users can directly compare the number of colors used (k), the order in which nodes are colored, and the overall efficiency of each heuristic for a given graph structure.

## 🛠️ Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/graph-coloring-visualizer.git](https://github.com/your-username/graph-coloring-visualizer.git)
    cd graph-coloring-visualizer
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 🧠 Understanding the Example Graph

The default graph provided upon loading the application is not random. It is specifically structured to demonstrate the strengths and weaknesses of the different heuristics:

- It consists of **two 4-cliques** (groups of 4 nodes where every node is connected to every other node in the group).
- These two cliques are connected by a **single bridge node** (Node 5 is connected to Node 1).

This structure can trick simpler algorithms. For example, a basic **Greedy** algorithm might color the first clique with 4 colors, use one of those same colors on the bridge node, and then be forced to use 4 _new_ colors for the second clique, resulting in a suboptimal solution. A more advanced heuristic like **DSATUR** can often navigate this structure more intelligently to find a solution with fewer colors.
