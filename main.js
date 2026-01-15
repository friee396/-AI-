let story;
let current = "start";

fetch("story.json")
  .then(res => res.json())
  .then(data => {
    story = data;
    render();
  });

function render() {
  // 画面を一番上に戻す
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  const node = story[current];
  const textDiv = document.getElementById("text");
  const choicesDiv = document.getElementById("choices");

  // 配列かどうかで表示を切り替える
  if (Array.isArray(node.text)) {
    textDiv.innerText = node.text.join("\n");
  } else {
    textDiv.innerText = node.text;
  }

  choicesDiv.innerHTML = "";

  if (node.choices) {
    node.choices.forEach(c => {
      const btn = document.createElement("button");
      btn.innerText = c.label;
      btn.onclick = () => {
        current = c.next;
        render();
      };
      choicesDiv.appendChild(btn);
    });
  } else if (node.next) {
    const btn = document.createElement("button");
    btn.innerText = "次へ";
    btn.onclick = () => {
      current = node.next;
      render();
    };
    choicesDiv.appendChild(btn);
  }
}
