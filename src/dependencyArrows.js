(() => {
  const dependencyTemplate = document.createElement("div");
  dependencyTemplate.classList = [
    "border-2",
    "border-red-500",
    "absolute",
    "z-10",
  ];
  const dependencyContainer = document.getElementById("dependencyContainer");

  const dependencies = [
    { id: "dep1", from: "task1", to: "task3", type: "1" }, // type 1 == END_START
    { id: "dep2", from: "task2", to: "task3", type: "2" }, // type 2 == END_END
  ];

  dependencies.forEach((dep) => {
    const task1Rect = document.getElementById(dep.from).getBoundingClientRect();
    const task2Rect = document.getElementById(dep.to).getBoundingClientRect();
    switch (dep.type) {
      case "1": {
        let drTop = task1Rect.top + task1Rect.height / 2;
        let drLeft = task2Rect.left - 10;
        let drWidth = task1Rect.right - task2Rect.left + 20;
        let drHeight = (task2Rect.top - task1Rect.top) / 2;
        dependencyTemplate.style = `top: ${drTop}px; left: ${drLeft}px; width: ${drWidth}px; height: ${drHeight}px; border-left: none;`;
        dependencyContainer.appendChild(dependencyTemplate.cloneNode(true));
        drTop = task2Rect.top - 5;
        drLeft = task2Rect.left - 10;
        drWidth = task1Rect.right - task2Rect.left + 20;
        drHeight = (task2Rect.top - task1Rect.top) / 2;
        dependencyTemplate.style = `top: ${drTop}px; left: ${drLeft}px; width: ${drWidth}px; height: ${drHeight}px; border-left: none;`;
        dependencyContainer.appendChild(dependencyTemplate.cloneNode(true));
        break;
      }
      case "2": {
        break;
      }
    }
  });

  /*const line = document.createElementNS('http://www.w3.org/2000/svg','line');  
  line.setAttribute("x1", task1Rect.right);
  line.setAttribute("y1", task1Rect.top + task1Rect.height/2);
  line.setAttribute("x2", task1Rect.right + 10);
  line.setAttribute("y2", task1Rect.top + task1Rect.height/2);
  line.setAttribute("stroke", "red");  
  document.getElementById("dependencyArrow").appendChild(line);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute("x1", task1Rect.right + 10);
  line.setAttribute("y1", task1Rect.top + task1Rect.height/2);
  line.setAttribute("x2", task1Rect.right + 10);
  line.setAttribute("y2", task1Rect.bottom + 5);
  line.setAttribute("stroke", "red");  
  document.getElementById("dependencyArrow").appendChild(line);*/
})();
