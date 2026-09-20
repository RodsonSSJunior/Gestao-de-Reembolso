export default function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _ReembolsoService = context.executeAction('/ReembolsoApp/Actions/ReembolsoService/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    // The Initialize<Online|Offline>.action wires its own OnSuccess (success
    // toast) and OnFailure (failure banner) handlers. We propagate the
    // rejection so the caller of Initialize() — typically the Application's
    // OnLaunch chain — can react to a failed initialization rather than
    // proceeding as if everything were fine. Older revisions of this
    // template returned `false` from the catch, which silently swallowed
    // initialization errors (MDK-18173 review section 1.2).
    return Promise.all([_ReembolsoService]);
}