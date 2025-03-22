const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const formatting = [[18, false], [10, true], [8, true], [8, true], [18, true], [6, true]];

if (data) {
  const [table, max] = data
    .split('\n')
    .reduce(([table, max], line, index, origin) => {
      if (index > 0 && index < origin.length - 1) {
        const cells = line.split(',');
        const d = parseInt(cells[3]);
        if (d > max) max = d;
        table.push(cells);
      }

      return [table, max];
    }, [[], 0]);

  table
    .map(row => {
      const a = Math.round((row[3] * 100) / max);
      row.push(a.toString());
      return row;
    })
    .sort((r1, r2) => (parseInt(r2[5]) > parseInt(r1[5]) ? 1 : -1))
    .map(row => row
      .map((cell, index) => cell[formatting[index][1] ? 'padStart' : 'padEnd'](formatting[index][0]))
      .join(''))
    .forEach(line => console.log(line));
}
