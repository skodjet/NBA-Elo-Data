function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  function winLoss (){
    const brush = vl.selectInterval().encodings("x");
      
    const wins = vl.markBar()
      .data(nba_elo_typed)
      .transform(
        vl.filter(brush),
        vl.calculate('datum.game_result == "W" ? "Wins" : "Losses"').as('Outcome'),
        vl.aggregate(vl.count().as('count')).groupby('fran_id', 'Outcome'),
      )
      .title("Win and Loss Count by Team")
      .encode(
        vl.x().fieldN('fran_id').axis({title: 'Team'}),
        vl.y().fieldQ('count'),
        vl.color().fieldN('Outcome').scale({ 
            range: ["red", "green"],
          }),
        vl.tooltip(['fran_id', 'Outcome', 'count']),
        );
    
    const timeplot =  vl.markLine({
      point: {
          size: 50,
          filled: true,
          stroke: "white"
        }
      })
      .title("Maximum ELO of Each Year")
      .select(brush)
      .data(nba_elo_typed)
      .transform(
        vl.groupby('year_id').aggregate(vl.max('elo_n').as('Max ELO')),
      )
      .encode(
          vl.x().fieldN("year_id").axis({title: 'Year'}),
          vl.y().fieldQ('Max ELO').scale({domain: [1600, 1900]}),
          vl.color().value('purple'),
          vl.tooltip(['Max ELO', 'fran_id']),
        );
    
      return vl.vconcat(wins, timeplot)
        .spacing(20)
        .render();
    }
    