let story;
let current = "start";

fetch("story.json")
    .then(res => res.json())
    .then(data => {
        story = data;
        render();
    });

function render() {
    const node = story[current];
    const textDiv = document.getElementById("text");
    const choicesDiv = document.getElementById("choices");

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
  function render() {
    // ここを追加
    window.scrollTo({
      top: 0,
      behavior: "instant" // ぬるっとさせたいなら "smooth"
    });

    const node = story[current];
    const textDiv = document.getElementById("text");
    const choicesDiv = document.getElementById("choices");

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

}
