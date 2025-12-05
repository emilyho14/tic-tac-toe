import React, {useState} from "react";

function Winner({winner}) {
    if (!winner) {
        return (
            <div>
                No Winner Yet
            </div>
        )
    } else {
        return (
            <div>
                Player {winner} has won!
            </div>
        )
    };
}

export default Winner;