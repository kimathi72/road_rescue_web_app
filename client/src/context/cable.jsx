import React from "react";
import ActionCable from "actioncable";

const CableContext = React.createContext();

function CableProvider({ children }) {
    const token = localStorage.getItem('jwt')
    const actionCableUrl = process.env.NODE_ENV === 'production' ? `wss://forth-year-project-waweru.onrender.com/cable?token=${token}` : `ws://localhost:3000/cable?token=${token}`

    const CableApp = {}
    CableApp.cable = ActionCable.createConsumer(actionCableUrl)

    return <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>;
}

export { CableContext, CableProvider };