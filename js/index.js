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

const plot_1 = {
    "vconcat": [
      {
        "mark": {
          "type": "bar"
        },
        "data": {
          "url": "https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_elo_is_copy.csv"
        },
        "transform": [
          {
            "filter": {
              "param": "name79"
            }
          },
          {
            "calculate": "datum.game_result == \"W\" ? \"Wins\" : \"Losses\"",
            "as": "Outcome"
          },
          {
            "aggregate": [
              {
                "op": "count",
                "as": "count"
              }
            ],
            "groupby": [
              "fran_id",
              "Outcome"
            ]
          }
        ],
        "title": "Win and Loss Count by Team",
        "encoding": {
          "x": {
            "field": "fran_id",
            "type": "nominal",
            "axis": {
              "title": "Team"
            }
          },
          "y": {
            "field": "count",
            "type": "quantitative"
          },
          "color": {
            "field": "Outcome",
            "type": "nominal",
            "scale": {
              "range": [
                "red",
                "green"
              ]
            }
          },
          "tooltip": [
            {
              "field": "fran_id",
              "type": "nominal"
            },
            {
              "field": "Outcome",
              "type": "nominal"
            },
            {
              "field": "count",
              "type": "nominal"
            }
          ]
        }
      },
      {
        "mark": {
          "type": "line",
          "point": {
            "size": 50,
            "filled": true,
            "stroke": "white"
          }
        },
        "title": "Maximum ELO of Each Year",
        "params": [
          {
            "name": "name79",
            "select": {
              "type": "interval",
              "encodings": [
                "x"
              ]
            }
          }
        ],
        "data": {
          "url":"https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_elo_is_copy.csv"
        },
        "transform": [
          {
            "aggregate": [
              {
                "op": "max",
                "field": "elo_n",
                "as": "Max ELO"
              }
            ],
            "groupby": [
              "year_id"
            ]
          }
        ],
        "encoding": {
          "x": {
            "field": "year_id",
            "type": "nominal",
            "axis": {
              "title": "Year"
            }
          },
          "y": {
            "field": "Max ELO",
            "type": "quantitative",
            "scale": {
              "domain": [
                1600,
                1900
              ]
            }
          },
          "color": {
            "value": "purple"
          },
          "tooltip": [
            {
              "field": "Max ELO",
              "type": "nominal"
            },
            {
              "field": "fran_id",
              "type": "nominal"
            }
          ]
        }
      }
    ],
    "spacing": 20
  };

  
vegaEmbed('#vis', plot_1);

const plot_2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": "https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_elo_is_copy.csv"
  },
  "layer": [
    {
      "mark": {"type": "line", "point": false},
      "params": [
        {
          "name": "team",
          "select": {
            "type": "point",
            "fields": [
              "fran_id"
            ]
          },
          "bind": {
            "input": "select",
            "options": [
              null,
              "Bucks",
              "Bulls",
              "Cavaliers",
              "Celtics",
              "Clippers",
              "Grizzlies",
              "Hawks",
              "Heat",
              "Hornets",
              "Jazz",
              "Kings",
              "Knicks",
              "Lakers",
              "Magic",
              "Mavericks",
              "Nets",
              "Nuggets",
              "Pacers",
              "Pelicans",
              "Pistons",
              "Raptors",
              "Rockets",
              "Sixers",
              "Spurs",
              "Suns",
              "Thunder",
              "Timberwolves",
              "Trailblazers",
              "Warriors",
              "Wizards"
            ],
            "name": "Franchise",
            "labels": ["Default"]
          }
        }
      ],
      "encoding": {
        "x": {
          "field": "year_id",
          "type": "temporal",
          "scale": {"domain": [{"year": 1976}, {"year": 2016}]},
          "axis": {"title": "Year"}
        },
        "y": {
          "field": "elo_n",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [1100, 1900]},
          "axis": {"title": "Mean ELO"}
        },
        "color": {
          "condition": {
            "param": "team",
            "field": "fran_id",
            "type": "nominal",
            "legend": {"title": "Franchise"},
            "scale": {"range": ["#0F6915", "#CF3C25", "#78180A", "#2DA60F", "#828282", "#124682", "#DE2209", "#AD0202", "#36E3D5", "#F0EC26", "#710BBA", "#E8900C", "#CCC921", "#2175BF", "#0A8BFC", "#000408", "#CCD16F", "#767801", "#090D42", "#404BC2", "#A8524A", "#F5AFA9", "#5A8AFA", "#A8A8A8", "#FAA700", "#FCE1A9", "#5C6C94", "#9E8078", "#0227A1", "#998D8D"]}
          },
          "value": "grey"
        },
        "size": {
          "condition": {
            "param": "team",
            "empty": false,
            "value": 5
          }
        },
        "opacity": {
          "condition": {
            "param": "team",
            "value": 1,
            "empty": false
          },
          "value": 0.25
        }
      }
    },
    {
      "mark": {
        "type": "point",
        "filled": true
      },
      "encoding": {
        "x": {
          "field": "year_id",
          "type": "temporal",
          "scale": {"domain": [{"year": 1976}, {"year": 2016}]}
        },
        "y": {
          "field": "elo_n",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [1100, 1900]}
        },
        "color": {
          "condition": {
            "param": "team",
            "field": "fran_id",
            "type": "nominal",
            "scale": {"range": ["#0F6915", "#CF3C25", "#78180A", "#2DA60F", "#828282", "#124682", "#DE2209", "#AD0202", "#36E3D5", "#F0EC26", "#710BBA", "#E8900C", "#CCC921", "#2175BF", "#0A8BFC", "#000408", "#CCD16F", "#767801", "#090D42", "#404BC2", "#A8524A", "#F5AFA9", "#5A8AFA", "#A8A8A8", "#FAA700", "#FCE1A9", "#5C6C94", "#9E8078", "#0227A1", "#998D8D"]}
          },
          "value": "grey"
        },
        "opacity": {
          "condition": {
            "param": "team",
            "value": 1,
            "empty": false
          },
          "value": 1
        },
        "size": {
          "condition": {
            "param": "team",
            "empty": false,
            "value": 144
          },
          "value": 0
        },
        "tooltip": [
          {
            "field": "fran_id",
            "type": "nominal",
            "title": "Team"
          },
          {
            "field": "elo_n",
            "type": "quantitative",
            "aggregate": "mean",
            "title": "Mean ELO"
          }
        ]
      }
    }
  ],
  "width": 900,
  "height": 600
};

vegaEmbed('#vis2', plot_2);

const plot_3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": "https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_elo_is_copy.csv"
  },
  "layer": [
    {
      "mark": {"type": "point", "filled": true},
      "params": [
        {
          "name": "team",
          "select": {
            "type": "point",
            "fields": [
              "fran_id"
            ]
          },
          "bind": {
            "input": "select",
            "options": [
              null,
              "Bucks",
              "Bulls",
              "Cavaliers",
              "Celtics",
              "Clippers",
              "Grizzlies",
              "Hawks",
              "Heat",
              "Hornets",
              "Jazz",
              "Kings",
              "Knicks",
              "Lakers",
              "Magic",
              "Mavericks",
              "Nets",
              "Nuggets",
              "Pacers",
              "Pelicans",
              "Pistons",
              "Raptors",
              "Rockets",
              "Sixers",
              "Spurs",
              "Suns",
              "Thunder",
              "Timberwolves",
              "Trailblazers",
              "Warriors",
              "Wizards"
            ],
            "name": "Franchise",
            "labels": ["Default"]
          }
        }
      ],
      "encoding": {
        "x": {
          "field": "pts",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [80, 130]},
          "title": "Mean Points Scored"
        },
        "y": {
          "field": "opp_pts",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [80, 132]},
          "title": "Mean Opponent Points Scored"
        },
        "color": {
          "condition": {
            "param": "team",
            "field": "year_id",
            "type": "temporal",
            "title": "Year",
            "scale": {"range": ["#32ff00", "#ff0004"]},
            "legend": {
              "gradientLength": 600,
              "gradientThickness": 20,
              "labelExpr": "timeFormat(datum.value, '%Y')"
            }
          },
          "value": "#BCBCBC"
        },
        "detail": {
          "field": "fran_id",
          "type": "nominal"
        },
        "order": {
          "condition": {
            "param": "team",
            "empty": false,
            "value": 10
          },
          "value": 1
        },
        "size": {
          "condition": {
            "param": "team",
            "empty": false,
            "value": 169
          }
        }
      }
    },
    {
      "mark": {"type": "point", "filled": true, "opacity": 0},
      "transform": [
        {
          "filter": {
            "param": "team" 
          }
        }
      ],
      "encoding": {
        "x": {
          "field": "pts",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [80, 130]}
        },
        "y": {
          "field": "opp_pts",
          "type": "quantitative",
          "aggregate": "mean",
          "scale": {"domain": [80, 132]}
        },
        "size": {
          "condition": {
            "param": "team",
            "empty": false,
            "value": 169
          }
        },
        "tooltip": [
          {
            "field": "year_id",
            "type": "temporal",
            "title": "Year",
            "format": "%Y"
          },
          {
            "field": "fran_id",
            "type": "nominal",
            "title": "Franchise"
          },
          {
            "field": "pts",
            "type": "quantitative",
            "aggregate": "mean",
            "title": "Mean Points Scored",
            "format": ".2f"
          },
          {
            "field": "opp_pts",
            "type": "quantitative",
            "aggregate": "mean",
            "title": "Mean Opponent Points Scored",
            "format": ".2f"
          }
        ]
      }
    }
  ],
  "width": 900,
  "height": 600
};
vegaEmbed('#vis3', plot_3);

const plot_4 = {
  "params": [
      {
          "name": "year_selected",
          "value": 1980,
          "bind": {
              "input": "range",
              "min": 1980,
              "max": 2015,
              "step": 1
          }
      }
  ],
  "hconcat": [
      {
          "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
          "width": 800,
          "height": 500,
          "projection": {
              "type": "albersUsa"
          },
          "layer": [
              {
                  "data": {
                      "url": "https://raw.githubusercontent.com/vega/vega-datasets/main/data/us-10m.json",
                      "format": {
                          "type": "topojson",
                          "feature": "states"
                      }
                  },
                  "mark": {
                      "type": "geoshape",
                      "fill": "lightgray",
                      "stroke": "white"
                  }
              },
              {
                  "data": {
                      "url": "https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_geo.csv",
                      "format": {
                          "type": "csv",
                          "parse": {
                              "year": "number"
                          }
                      }
                  },
                  "encoding": {
                      "longitude": {
                          "field": "long",
                          "type": "quantitative"
                      },
                      "latitude": {
                          "field": "lat",
                          "type": "quantitative"
                      },
                      "tooltip": [
                          {
                              "field": "team"
                          },
                          {
                              "field": "mean_elo"
                          }
                      ]
                  },
                  "transform": [
                      {
                          "filter": {
                              "field": "year",
                              "equal": {
                                  "expr": "year_selected"
                              }
                          }
                      }
                  ],
                  "layer": [
                      {
                          "mark": {
                              "type": "circle",
                              "tooltip": true
                          },
                          "encoding": {
                              "size": {
                                  "field": "mean_elo",
                                  "type": "quantitative",
                                  "scale": {
                                      "type": "pow",
                                      "exponent": 0.5,
                                      "zero": false,
                                      "range": [
                                          10,
                                          5000
                                      ]
                                  }
                              },
                              "color": {
                                  "condition": {
                                      "param": "year_selected",
                                      "field": "conference",
                                      "type": "nominal",
                                      "scale": {
                                          "range": [
                                              "green",
                                              "purple"
                                          ]
                                      }
                                  },
                                  "value": "#BCBCBC"
                              }
                          }
                      },
                      {
                          "mark": {
                              "type": "text",
                              "dy": -10
                          },
                          "encoding": {
                              "text": {
                                  "field": "team",
                                  "type": "nominal"
                              }
                          }
                      }
                  ]
              }
          ]
      },
      {
          "width": 300,
          "height": 500,
          "data": {
              "url": "https://raw.githubusercontent.com/skodjet/NBA-Elo-Data/main/nba_geo.csv",
              "format": {
                  "type": "csv",
                  "parse": {
                      "year": "number"
                  }
              }
          },
          "mark": "bar",
          "transform": [
              {
                  "filter": {
                      "field": "year",
                      "equal": {
                          "expr": "year_selected"
                      }
                  }
              }
          ],
          "encoding": {
              "x": {
                  "field": "conference",
                  "type": "ordinal",
                  "title": "Conference"
              },
              "y": {
                  "field": "mean_elo",
                  "type": "quantitative",
                  "title": "Mean Elo"
              },
              "color": {
                  "field": "conference",
                  "type": "nominal",
                  "scale": {
                      "range": [
                          "red",
                          "blue"
                      ]
                  },
                  "title": "Average Elo"
              }
          }
      }
  ]
};

vegaEmbed('#vis4', plot_4);

const plot_5 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A basic line chart example.",
  "width": 600,
  "height": 600,
  "padding": 10,
  // "signals": [
  //     {
  //         "name": "EC vs WC Average ELO",
  //         "value": "linear",
  //         "bind": {
  //             "input": "select",
  //             "options": [
  //                 "basis",
  //                 "cardinal",
  //                 "catmull-rom",
  //                 "linear",
  //                 "monotone",
  //                 "natural",
  //                 "step",
  //                 "step-after",
  //                 "step-before"
  //             ]
  //         }
  //     }
  // ],
  "data": [
      {
          "name": "table",
          "values": [
              {
                  "x": 1976,
                  "y": 1493.45,
                  "c": 0
              },
              {
                  "x": 1976,
                  "y": 1438.72,
                  "c": 1
              },
              {
                  "x": 1980,
                  "y": 1505.7,
                  "c": 0
              },
              {
                  "x": 1980,
                  "y": 1515.58,
                  "c": 1
              },
              {
                  "x": 1984,
                  "y": 1519.9,
                  "c": 0
              },
              {
                  "x": 1984,
                  "y": 1495,
                  "c": 1
              },
              {
                  "x": 1988,
                  "y": 1510.63,
                  "c": 0
              },
              {
                  "x": 1988,
                  "y": 1600.4,
                  "c": 1
              },
              {
                  "x": 1992,
                  "y": 1535.58,
                  "c": 0
              },
              {
                  "x": 1992,
                  "y": 1482.57,
                  "c": 1
              },
              {
                  "x": 1996,
                  "y": 1529,
                  "c": 0
              },
              {
                  "x": 1996,
                  "y": 1490.93,
                  "c": 1
              },
              {
                  "x": 2000,
                  "y": 1497.64,
                  "c": 0
              },
              {
                  "x": 2000,
                  "y": 1501.53,
                  "c": 1
              },
              {
                  "x": 2004,
                  "y": 1530,
                  "c": 0
              },
              {
                  "x": 2004,
                  "y": 1500.93,
                  "c": 1
              },
              {
                  "x": 2008,
                  "y": 1585.93,
                  "c": 0
              },
              {
                  "x": 2008,
                  "y": 1505.87,
                  "c": 1
              },
              {
                  "x": 2012,
                  "y": 1605.33,
                  "c": 0
              },
              {
                  "x": 2012,
                  "y": 1529.47,
                  "c": 1
              },
              {
                  "x": 2016,
                  "y": 1610.87,
                  "c": 0
              },
              {
                  "x": 2016,
                  "y": 1577.8,
                  "c": 1
              },
              {
                  "x": 2020,
                  "y": 1537.6,
                  "c": 0
              },
              {
                  "x": 2020,
                  "y": 1600.47,
                  "c": 1
              }
          ]
      }
  ],
  "scales": [
      {
          "name": "x",
          "type": "point",
          "range": "width",
          "domain": {
              "data": "table",
              "field": "x"
          }
      },
      {
          "name": "y",
          "type": "linear",
          "range": "height",
          "nice": true,
          "zero": false,
          "domain": {
              "data": "table",
              "field": "y"
          }
      },
      {
          "name": "color",
          "type": "ordinal",
          "range": "category",
          "domain": {
              "data": "table",
              "field": "c"
          }
      }
  ],
  "axes": [
      {
          "orient": "bottom",
          "scale": "x",
          "title": "Year"
      },
      {
          "orient": "left",
          "scale": "y",
          "title": "Average  ELO  Value"
      }
  ],
  "marks": [
      {
          "type": "group",
          "from": {
              "facet": {
                  "name": "series",
                  "data": "table",
                  "groupby": "c"
              }
          },
          "marks": [
              {
                  "type": "line",
                  "from": {
                      "data": "series"
                  },
                  "encode": {
                      "enter": {
                          "x": {
                              "scale": "x",
                              "field": "x"
                          },
                          "y": {
                              "scale": "y",
                              "field": "y"
                          },
                          "stroke": {
                              "scale": "color",
                              "field": "c"
                          },
                          "strokeWidth": {
                              "value": 2
                          }
                      },
                      "update": {
                          "strokeOpacity": {
                              "value": 1
                          }
                      },
                      "hover": {
                          "strokeOpacity": {
                              "value": 0.5
                          }
                      }
                  }
              }
          ]
      }
  ],
  "encoding": {
    "color": {
      "field": "c",
      "type": "nominal",
      "scale": {
        "range": ['purple', 'green']
      }
    }
  }
 
}

vegaEmbed('#vis5', plot_5);
