const $882b6d93070905b3$var$statusDisplay = document.querySelector(".game_status");
let $882b6d93070905b3$var$gameActive = true;
let $882b6d93070905b3$var$currentPlayer = "X";
let $882b6d93070905b3$var$gameState = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];
let $882b6d93070905b3$var$X_wins = localStorage.getItem("X_wins") || 0;
let $882b6d93070905b3$var$O_wins = localStorage.getItem("O_wins") || 0;
const $882b6d93070905b3$var$x_score = document.querySelector(".x_score");
const $882b6d93070905b3$var$o_score = document.querySelector(".o_score");
const $882b6d93070905b3$var$winningMessage = ()=>`Player ${$882b6d93070905b3$var$currentPlayer === "X" ? `<span class="X">${$882b6d93070905b3$var$currentPlayer}</span>` : `<span class="O">${$882b6d93070905b3$var$currentPlayer}</span>`} has won!`;
const $882b6d93070905b3$var$drawMessage = ()=>`Game ended in a draw!`;
const $882b6d93070905b3$var$currentPlayerTurn = ()=>`It's ${$882b6d93070905b3$var$currentPlayer === "X" ? '<span class="X">X\'s</span>' : '<span class="O">O\'s</span>'} turn`;
$882b6d93070905b3$var$x_score.innerHTML = $882b6d93070905b3$var$X_wins;
$882b6d93070905b3$var$o_score.innerHTML = $882b6d93070905b3$var$O_wins;
const $882b6d93070905b3$var$winningConditions = [
    [
        0,
        1,
        2
    ],
    [
        3,
        4,
        5
    ],
    [
        6,
        7,
        8
    ],
    [
        0,
        3,
        6
    ],
    [
        1,
        4,
        7
    ],
    [
        2,
        5,
        8
    ],
    [
        0,
        4,
        8
    ],
    [
        2,
        4,
        6
    ]
];
$882b6d93070905b3$var$statusDisplay.innerHTML = $882b6d93070905b3$var$currentPlayerTurn();
function $882b6d93070905b3$var$handleCellPlayed(clickedCell, clickedCellIndex) {
    $882b6d93070905b3$var$gameState[clickedCellIndex] = $882b6d93070905b3$var$currentPlayer;
    clickedCell.innerHTML = $882b6d93070905b3$var$currentPlayer;
    clickedCell.setAttribute("data-mark", $882b6d93070905b3$var$currentPlayer);
}
function $882b6d93070905b3$var$handlePlayerChange() {
    $882b6d93070905b3$var$currentPlayer = $882b6d93070905b3$var$currentPlayer === "X" ? "O" : "X";
    $882b6d93070905b3$var$statusDisplay.innerHTML = $882b6d93070905b3$var$currentPlayerTurn();
}
function $882b6d93070905b3$var$handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        const winCondition = $882b6d93070905b3$var$winningConditions[i];
        let a = $882b6d93070905b3$var$gameState[winCondition[0]];
        let b = $882b6d93070905b3$var$gameState[winCondition[1]];
        let c = $882b6d93070905b3$var$gameState[winCondition[2]];
        if (a === "" || b === "" || c === "") continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        $882b6d93070905b3$var$statusDisplay.innerHTML = $882b6d93070905b3$var$winningMessage();
        $882b6d93070905b3$var$gameActive = false;
        $882b6d93070905b3$var$currentPlayer === "X" ? ++$882b6d93070905b3$var$X_wins : ++$882b6d93070905b3$var$O_wins;
        localStorage.setItem(`${$882b6d93070905b3$var$currentPlayer}_wins`, $882b6d93070905b3$var$currentPlayer === "X" ? $882b6d93070905b3$var$X_wins : $882b6d93070905b3$var$O_wins);
        // after 2 seconds, reload the page
        setTimeout(()=>{
            location.reload();
        }, 2000);
        return;
    }
    let roundDraw = !$882b6d93070905b3$var$gameState.includes("");
    if (roundDraw) {
        $882b6d93070905b3$var$statusDisplay.innerHTML = $882b6d93070905b3$var$drawMessage();
        $882b6d93070905b3$var$gameActive = false;
        setTimeout(()=>{
            location.reload();
        }, 2000);
        return;
    }
    $882b6d93070905b3$var$handlePlayerChange();
}
function $882b6d93070905b3$var$handleCellClick(clickedCellEvent) {
    console.log("clicked!!!!");
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell?.getAttribute("data-cell-index"));
    if ($882b6d93070905b3$var$gameState[clickedCellIndex] !== "" || !$882b6d93070905b3$var$gameActive) return;
    $882b6d93070905b3$var$handleCellPlayed(clickedCell, clickedCellIndex);
    $882b6d93070905b3$var$handleResultValidation();
}
function $882b6d93070905b3$var$handleRestartGame() {
    $882b6d93070905b3$var$gameActive = true;
    $882b6d93070905b3$var$currentPlayer = "X";
    $882b6d93070905b3$var$gameState = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    $882b6d93070905b3$var$statusDisplay.innerHTML = $882b6d93070905b3$var$currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell)=>cell.innerHTML = "");
}
const $882b6d93070905b3$var$cells = document.querySelectorAll(".cell");
$882b6d93070905b3$var$cells.forEach((cell)=>cell.addEventListener("click", $882b6d93070905b3$var$handleCellClick));
// cells.forEach(cell => cell.addEventListener('touchend', handleCellClick));
const $882b6d93070905b3$var$restart = document.querySelector(".game_restart");
$882b6d93070905b3$var$restart?.addEventListener("click", $882b6d93070905b3$var$handleRestartGame);
// restart?.addEventListener('touchend', handleRestartGame);
const $882b6d93070905b3$var$body = document.querySelector("body");
const $882b6d93070905b3$var$toggle = document.querySelector(".toggle_theme");
$882b6d93070905b3$var$toggle?.addEventListener("click", ()=>$882b6d93070905b3$var$body?.classList.toggle("light")); // toggle?.addEventListener('touchend', () => body?.classList.toggle('light'));


//# sourceMappingURL=index.js.map
