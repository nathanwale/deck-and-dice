import React from 'react';

export function Info() {
    return (
        <div className="info">
            <h1>
                A Match Three Game written in React
            </h1>
            <p>
                This is a Match Three game written in <a href="https://reactjs.org/">React.</a> I started 
                with the <a href="https://reactjs.org/tutorial/tutorial.html">Tic Tac Toe tutorial</a> on 
                the React site, and just kept going.
            </p>
            <p>
                You can view the source for it on GitHub <a href='https://github.com/nathanwale/match-three-react'>here</a>.
            </p>
            <p>
                My blog is <a href="https://looploopbreak.netlify.app/">Loop Loop Break</a> if you want to contact 
                me or learn more about me.
            </p>
        </div>
    );
}