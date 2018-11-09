/*
Get average results data per group.
*/
function getAverageGroupResults(groups) {
  const averageData = [];

  groups.forEach(group => {
    let sum = 0;

    group.questions.forEach(question => {
      sum += Number(question.answer);
    });

    const groupData = {
      name: group.title,
      value: sum / group.questions.length
    };

    averageData.push(groupData);
  });

  return averageData;
}

export default { getAverageGroupResults };
