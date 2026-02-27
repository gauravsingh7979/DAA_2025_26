

from typing import List, Tuple

Edge = Tuple[int, int, int]


class DisjointSet:
    def __init__(self, size: int) -> None:
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, node: int) -> int:
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]

    def union(self, a: int, b: int) -> bool:
        root_a = self.find(a)
        root_b = self.find(b)

        if root_a == root_b:
            return False

        if self.rank[root_a] < self.rank[root_b]:
            self.parent[root_a] = root_b
        elif self.rank[root_a] > self.rank[root_b]:
            self.parent[root_b] = root_a
        else:
            self.parent[root_b] = root_a
            self.rank[root_a] += 1
        return True


def kruskal(num_vertices: int, edges: List[Edge]) -> Tuple[int, List[Edge]]:
    """Return (total_weight, mst_edges) using Kruskal's algorithm."""
    dsu = DisjointSet(num_vertices)
    mst_edges: List[Edge] = []
    total_weight = 0

    for u, v, w in sorted(edges, key=lambda edge: edge[2]):
        if dsu.union(u, v):
            mst_edges.append((u, v, w))
            total_weight += w
            if len(mst_edges) == num_vertices - 1:
                break

    if len(mst_edges) != num_vertices - 1:
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

    weight, mst = kruskal(num_vertices=6, edges=sample_edges)
    print("Total MST weight:", weight)
    print("MST edges:", mst)
