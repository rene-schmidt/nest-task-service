export declare const JobStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly DONE: "DONE";
    readonly FAILED: "FAILED";
};
export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
