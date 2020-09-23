import {ModelInterface} from './entity';

export const enum Vote {
    POSITIVE = 0,
    NEGATIVE = 1,
    BLANK = 2,
    ABST = 3
}
export interface Meeting extends ModelInterface<number> {
    name: string;
    timeBegin: string;
    timeEnd: string;
    timeFrozen: string;
    contractAddress: string;
}
export interface UserMeeting extends ModelInterface<number> {
    user__id: number;
    meeting_id: number;
}
