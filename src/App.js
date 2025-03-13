import { create } from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const removeAllBears = useBearStore((state) => state.removeAllBears)

  return (
    <div>
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>remove all</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>React App</h1>
      <button onClick={() => alert('Hello World')}>Click Me !</button>
      <BearCounter />
    </div>
  );
}

export default App;
