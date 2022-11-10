export default class Queue {
    private queue;
    private running;
    constructor();
    enqueue(cb: () => void): void;
    dequeue(): void;
    run(): Promise<void>;
    pause(): void;
    reset(): void;
    isRunning(): boolean;
    isEmpty(): boolean;
}
//# sourceMappingURL=RequestQueue.d.ts.map