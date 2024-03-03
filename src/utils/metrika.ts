const YID = 96486278;
declare const window: any;
export const sendMetrika = (action: string, actionType: string) => {
    if (typeof window !== "undefined" && typeof window.ym !== "undefined") {
        if (process.env.NODE_ENV === 'production') {
            window.ym(YID, actionType, action);
        } else {
            console.log(actionType, action)
        }

    }
}