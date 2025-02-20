// Add these constants at the top of the file after imports
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const DAYS_IN_WEEK = 7;
export const MILLISECONDS = 1000;

export const REFRESH_TOKEN_EXPIRY =
    DAYS_IN_WEEK *
    HOURS_IN_DAY *
    MINUTES_IN_HOUR *
    SECONDS_IN_MINUTE *
    MILLISECONDS;
