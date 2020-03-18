`use strict`;

const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assessment`);
const resultArea = document.getElementById(`result-area`);
const tweetArea = document.getElementById(`tweet-area`);

const answers = [
    `{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。`,
    `{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。`,
    `{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。`,
    `{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。`,
    `{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。`,
    `{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。`,
    `{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。`,
    `{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。`,
    `{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。`,
    `{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。`,
    `{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。`,
    `{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。`,
    `{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。`,
    `{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。`,
    `{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。`,
    `{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。`,
    `{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち居振る舞いに多くの人が癒やされています。`
];

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { return; }
    updateResultArea(userName);
    updateTweetArea(userName);
}

userNameInput.onkeydown = (event) => {
    if (event.key === `Enter`) { assessmentButton.onclick(); }
}

function updateTweetArea(userName) {
    removeAllChildren(tweetArea);
    const tweetButton = document.createElement(`a`);
    tweetButton.setAttribute(`href`,
        `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent(`あなたのいいところ`)}&ref_src=twsrc%5Etfw`);
    tweetButton.className = `twitter-hashtag-button`;
    tweetButton.setAttribute(`data-text`, `診断結果の文章`);
    tweetButton.innerText = `Tweet #あなたのいいところ`;
    tweetButton.setAttribute('data-text', assessment(userName));
    tweetArea.appendChild(tweetButton);
    twttr.widgets.load();
}

function removeAllChildren(area) {
    while (area.firstChild !== null) {
        area.removeChild(area.firstChild);
    }
}

function updateResultArea(userName) {
    removeAllChildren(resultArea);
    const header = document.createElement(`h3`);
    header.innerText = `診断結果`;
    resultArea.appendChild(header);

    const result = document.createElement(`p`);
    result.innerText = assessment(userName);
    resultArea.appendChild(result);
}

/**
 * 
 * @param {*} userName 
 */
function assessment(userName) {
    let sumOfCharCode = 0;
    for (let ii = 0; ii < userName.length; ++ii) {
        sumOfCharCode += userName.charCodeAt(ii);
    }

    let result = answers[sumOfCharCode % answers.length];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(assessment(`西`) ===
    `西のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる西が皆から評価されています。`,
    `なにかおかしいです`
);

console.assert(assessment(`西`) === assessment(`西`), `同じ名前で結果が異なります`);
