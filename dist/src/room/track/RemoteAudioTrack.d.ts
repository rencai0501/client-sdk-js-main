import { AudioReceiverStats } from '../stats';
import RemoteTrack from './RemoteTrack';
export default class RemoteAudioTrack extends RemoteTrack {
    private prevStats?;
    private elementVolume;
    constructor(mediaTrack: MediaStreamTrack, sid: string, receiver?: RTCRtpReceiver);
    /**
     * sets the volume for all attached audio elements
     */
    setVolume(volume: number): void;
    /**
     * gets the volume for all attached audio elements
     */
    getVolume(): number;
    attach(): HTMLMediaElement;
    attach(element: HTMLMediaElement): HTMLMediaElement;
    protected monitorReceiver: () => Promise<void>;
    protected getReceiverStats(): Promise<AudioReceiverStats | undefined>;
}
//# sourceMappingURL=RemoteAudioTrack.d.ts.map