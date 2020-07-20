import React from 'react';

const Home = () => {
    return (
        <div>
            <form action="" method="post">
                <input type="text" placeholder="expected time" type="number" min="0.1" step="0.1" required autoFocus/>
                <input type="text" placeholder="real time" type="number" min="0.1" step="0.1" required />
                <button type="submit">send</button>
            </form>
        </div>
    )
}

export default Home;