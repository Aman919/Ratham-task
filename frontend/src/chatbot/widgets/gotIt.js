import React, { useState } from 'react';

const GotItWidget = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleGotItClick = () => {
        setShowMessage(!showMessage);
    };

    return (
        <div>
            <button onClick={handleGotItClick}>Got it</button>
            {showMessage && <p> Got it</p>}
        </div>
    );
};

export default GotItWidget;