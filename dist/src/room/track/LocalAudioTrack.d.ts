import { AudioSenderStats } from '../stats';
import LocalTrack from './LocalTrack';
import { AudioCaptureOptions } from './options';
export default class LocalAudioTrack extends LocalTrack {
    sender?: RTCRtpSender;
    /** @internal */
    stopOnMute: boolean;
    private prevStats?;
    constructor(mediaTrack: MediaStreamTrack, constraints?: MediaTrackConstraints, userProvidedTrack?: boolean);
    setDeviceId(deviceId: string): Promise<void>;
    mute(): Promise<LocalAudioTrack>;
    unmute(): Promise<LocalAudioTrack>;
    restartTrack(options?: AudioCaptureOptions): Promise<void>;
    protected restart(constraints?: MediaTrackConstraints): Promise<LocalTrack>;
    startMonitor(): void;
    private monitorSender;
    getSenderStats(): Promise<AudioSenderStats | undefined>;
    checkForSilence(): Promise<void>;
}
//# sourceMappingURL=LocalAudioTrack.d.ts.map