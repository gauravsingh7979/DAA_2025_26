import heapq
from typing import List, Tuple

Edge = Tuple[int, int, int]


def prim(num_vertices: int, edges: List[Edge], start: int = 0) -> Tuple[int, List[Edge]]:
    """Return (total_weight, mst_edges) using Prim's algorithm."""
    if not (0 <= start < num_vertices):
        raise ValueError("Start vertex is out of range.")

    adjacency: List[List[Tuple[int, int]]] = [[] for _ in range(num_vertices)]
    for u, v, w in edges:
        adjacency[u].append((w, v))
        adjacency[v].append((w, u))

    visited = [False] * num_vertices
    min_heap: List[Tuple[int, int, int]] = [(0, start, -1)]  # (weight, node, parent)
    mst_edges: List[Edge] = []
    total_weight = 0
    visited_count = 0

    while min_heap and visited_count < num_vertices:
        weight, node, parent = heapq.heappop(min_heap)

        if visited[node]:
            continue

        visited[node] = True
        visited_count += 1
        total_weight += weight

        if parent != -1:
            mst_edges.append((parent, node, weight))

        for next_weight, neighbor in adjacency[node]:
            if not visited[neighbor]:
                heapq.heappush(min_heap, (next_weight, neighbor, node))

    if visited_count != num_vertices:
        raise ValueError("Graph is disconnected; MST does not exist.")

    return total_weight, mst_edges


if __name__ == "__main__":
    sample_edges = [
        (0, 1, 4),
        (0, 2, 3),
        (1, 2, 1),
        (1, 3, 2),
        (2, 3, 4),
        (3, 4, 2),
        (4, 5, 6),
    ]

    weight, mst = prim(num_vertices=6, edges=sample_edges, start=0)
    print("Total MST weight:", weight)
    print("MST edges:", mst)
