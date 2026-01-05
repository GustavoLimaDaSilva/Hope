type ToastProps = {
    toastFired: boolean,
    msg: string,
    className: string,
    callback?: Function
}
export default function Toast({ msg, className, callback, toastFired }: ToastProps) {

    localStorage.setItem('toastFired', JSON.stringify(true))
    return (
        <div className={className}>
            {msg}
        </div>
    )
}