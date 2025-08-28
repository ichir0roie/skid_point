import lcm from "compute-lcm"

export function calcSkid(front: number, rear: number): number {
  const rate = lcm(front, rear)
  if (typeof (rate) === "number") {
    return rate / front
  }

  return 0
}
