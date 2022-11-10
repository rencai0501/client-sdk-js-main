import type TypedEventEmitter from 'typed-emitter';
import { SignalClient, SignalOptions } from '../api/SignalClient';
import { DataPacket, DataPacket_Kind, SpeakerInfo, TrackInfo, UserPacket } from '../proto/livekit_models';
import { AddTrackRequest, JoinResponse } from '../proto/livekit_rtc';
import PCTransport from './PCTransport';
export declare const maxICEConnectTimeout: number;
declare const RTCEngine_base: new () => TypedEventEmitter<EngineEventCallbacks>;
/** @internal */
export default class RTCEngine extends RTCEngine_base {
    publisher?: PCTransport;
    subscriber?: PCTransport;
    client: SignalClient;
    rtcConfig: RTCConfiguration;
    get isClosed(): boolean;
    private lossyDC?;
    private lossyDCSub?;
    private reliableDC?;
    private reliableDCSub?;
    private subscriberPrimary;
    private primaryPC?;
    private pcState;
    private _isClosed;
    private pendingTrackResolvers;
    private hasPublished;
    private url?;
    private token?;
    private signalOpts?;
    private reconnectAttempts;
    private reconnectStart;
    private fullReconnectOnNext;
    private clientConfiguration?;
    private connectedServerAddr?;
    private attemptingReconnect;
    constructor();
    join(url: string, token: string, opts?: SignalOptions, abortSignal?: AbortSignal): Promise<JoinResponse>;
    close(): void;
    addTrack(req: AddTrackRequest): Promise<TrackInfo>;
    updateMuteStatus(trackSid: string, muted: boolean): void;
    get dataSubscriberReadyState(): string | undefined;
    get connectedServerAddress(): string | undefined;
    private configure;
    private handleDataChannel;
    private handleDataMessage;
    private handleDataError;
    private handleDisconnect;
    private restartConnection;
    private resumeConnection;
    waitForPCConnected(): Promise<void>;
    sendDataPacket(packet: DataPacket, kind: DataPacket_Kind): Promise<void>;
    private ensurePublisherConnected;
    /** @internal */
    negotiate(): void;
    dataChannelForKind(kind: DataPacket_Kind, sub?: boolean): RTCDataChannel | undefined;
}
export declare type EngineEventCallbacks = {
    connected: () => void;
    disconnected: () => void;
    resuming: () => void;
    resumed: () => void;
    restarting: () => void;
    restarted: (joinResp: JoinResponse) => void;
    signalResumed: () => void;
    mediaTrackAdded: (track: MediaStreamTrack, streams: MediaStream, receiver?: RTCRtpReceiver) => void;
    activeSpeakersUpdate: (speakers: Array<SpeakerInfo>) => void;
    dataPacketReceived: (userPacket: UserPacket, kind: DataPacket_Kind) => void;
    transportsCreated: (publisher: PCTransport, subscriber: PCTransport) => void;
};
export {};
//# sourceMappingURL=RTCEngine.d.ts.map