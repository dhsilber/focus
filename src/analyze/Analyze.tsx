import React from 'react'

const Analyze = () => {
    return <div className="analyze">
        <ol>
            <li>Do I have a current Event?</li>
            <li>How much time do I have available?
                <ul>
                    <li>Are there todos to be done?</li>
                    <li>Is there a task to be done?</li>
                </ul>
            </li>
        </ol>
    </div>
}

export default Analyze