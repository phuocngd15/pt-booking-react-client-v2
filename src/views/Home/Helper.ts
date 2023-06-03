export function mapStatusNumberToString(status: string) {
  switch (status) {
    case 'status1':
      return 'Waiting ticket';
    case 'status2':
      return 'Confirm ticket';
    case 'status3':
      return 'Done ticket';
    case 'status4':
      return 'Cancel ticket';
  }
}
export function mapObjectToArray(obj: any, container: any[]) {
  for (const key in obj) {
    if (key !== '_id') {
      const entry = {
        week: obj._id,
        category: mapStatusNumberToString(key),
        value: obj[key],
      };
      container.push(entry);
    }
  }

  return container;
}
