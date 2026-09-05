import 'dart:async';
import 'package:flutter/material.dart';

void main() {
  runApp(const MLeagueApp());
}

class MLeagueApp extends StatelessWidget {
  const MLeagueApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'M-League Admin Control',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF121212),
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  // Custom Team Logos Mapping
  final Map<String, String> teamLogos = {
    'Yangon United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Yangon_United_FC_logo.svg/220px-Yangon_United_FC_logo.svg.png',
    'Shan United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Shan_United_FC_logo.png/220px-Shan_United_FC_logo.png',
    'Myawady FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Myawady_FC_logo.png/220px-Myawady_FC_logo.png',
    'Dagon Star United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Dagon_FC.png/180px-Dagon_FC.png',
    'Ayeyawady United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Ayeyawady_United_FC_logo.png/220px-Ayeyawady_United_FC_logo.png',
    'Yadanarbon FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Yadanarbon_FC_logo.png/220px-Yadanarbon_FC_logo.png',
    'Thitsar Arman FC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Thitsar_Arman_FC_logo.png/220px-Thitsar_Arman_FC_logo.png',
    'Hantharwady United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Hantharwady_United_FC_logo.png/220px-Hantharwady_United_FC_logo.png',
    'Yangon City FC': '',
    'I.S.P.E FC': '',
    'Chinland FC': '',
    'Sagaing United FC': '',
  };

  // Global Standings Data
  List<Map<String, dynamic>> standingsData = [
    {"team": "Dagon Star United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Yangon United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Ayeyawady United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Yadanarbon FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Myawady FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Thitsar Arman FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Yangon City FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Shan United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "I.S.P.E FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Chinland FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Hantharwady United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
    {"team": "Sagaing United FC", "p": 0, "w": 0, "d": 0, "l": 0, "gf": 0, "ga": 0, "pts": 0},
  ];

  // Fixtures & Results List (Admin Controlled)
  List<Map<String, dynamic>> fixturesList = [
    {"home": "Thitsar Arman FC", "away": "Myawady FC", "score": "2 - 2", "status": "ပြီးဆုံး"},
    {"home": "Chinland FC", "away": "Yadanarbon FC", "score": "1 - 2", "status": "ပြီးဆုံး"},
    {"home": "Yangon United FC", "away": "Shan United FC", "score": "vs", "status": "ယှဉ်ပြိုင်မည်"},
  ];

  void _updateStandingsFromMatch(String home, String away, int hScore, int aScore) {
    setState(() {
      for (var team in standingsData) {
        if (team["team"] == home) {
          team["p"] += 1;
          team["gf"] += hScore;
          team["ga"] += aScore;
          if (hScore > aScore) {
            team["w"] += 1;
            team["pts"] += 3;
          } else if (hScore == aScore) {
            team["d"] += 1;
            team["pts"] += 1;
          } else {
            team["l"] += 1;
          }
        } else if (team["team"] == away) {
          team["p"] += 1;
          team["gf"] += aScore;
          team["ga"] += hScore;
          if (aScore > hScore) {
            team["w"] += 1;
            team["pts"] += 3;
          } else if (aScore == hScore) {
            team["d"] += 1;
            team["pts"] += 1;
          } else {
            team["l"] += 1;
          }
        }
      }

      standingsData.sort((a, b) {
        int ptsCompare = b["pts"].compareTo(a["pts"]);
        if (ptsCompare != 0) return ptsCompare;
        int gdA = a["gf"] - a["ga"];
        int gdB = b["gf"] - b["ga"];
        return gdB.compareTo(gdA);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      MatchControllerScreen(
        teamLogos: teamLogos,
        teamsList: standingsData.map((e) => e["team"].toString()).toList(),
        onMatchFinish: (home, away, hScore, aScore) {
          _updateStandingsFromMatch(home, away, hScore, aScore);
          setState(() {
            fixturesList.insert(0, {
              "home": home,
              "away": away,
              "score": "$hScore - $aScore",
              "status": "ပြီးဆုံး",
            });
          });
        },
      ),
      StandingsScreen(
        standingsData: standingsData,
        teamLogos: teamLogos,
        onUpdate: (newData) {
          setState(() {
            standingsData = newData;
          });
        },
      ),
      FixturesAdminScreen(
        teamsList: standingsData.map((e) => e["team"].toString()).toList(),
        fixturesList: fixturesList,
        onUpdateFixtures: (newList) {
          setState(() {
            fixturesList = newList;
          });
        },
      ),
      UpcomingMatchesScreen(
        fixturesList: fixturesList,
        teamLogos: teamLogos,
      ),
    ];

    return Scaffold(
      body: screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.greenAccent,
        unselectedItemColor: Colors.grey,
        backgroundColor: const Color(0xFF1E1E1E),
        type: BottomNavigationBarType.fixed,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.sports_soccer),
            label: 'Live',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.leaderboard),
            label: 'Standings',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_month),
            label: 'Fixtures',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.upcoming),
            label: 'နောက်လာမည်',
          ),
        ],
      ),
    );
  }
}

// Custom Team Logo Widget
Widget buildTeamLogo(String teamName, Map<String, String> teamLogos, {double size = 24.0}) {
  String? logoUrl = teamLogos[teamName];
  if (logoUrl != null && logoUrl.isNotEmpty) {
    return Image.network(
      logoUrl,
      width: size,
      height: size,
      fit: BoxFit.contain,
      errorBuilder: (context, error, stackTrace) {
        return _fallbackBadge(teamName, size);
      },
    );
  }
  return _fallbackBadge(teamName, size);
}

Widget _fallbackBadge(String name, double size) {
  return Container(
    width: size,
    height: size,
    decoration: const BoxDecoration(
      color: Colors.green,
      shape: BoxShape.circle,
    ),
    alignment: Alignment.center,
    child: Text(
      name.isNotEmpty ? name[0] : 'T',
      style: TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.bold,
        fontSize: size * 0.5,
      ),
    ),
  );
}

// ---------------- 1. Match Controller Screen ----------------
class MatchControllerScreen extends StatefulWidget {
  final Map<String, String> teamLogos;
  final List<String> teamsList;
  final Function(String home, String away, int hScore, int aScore) onMatchFinish;

  const MatchControllerScreen({
    super.key,
    required this.teamLogos,
    required this.teamsList,
    required this.onMatchFinish,
  });

  @override
  State<MatchControllerScreen> createState() => _MatchControllerScreenState();
}

class _MatchControllerScreenState extends State<MatchControllerScreen> {
  late String homeTeam;
  late String awayTeam;
  int homeScore = 0;
  int awayScore = 0;

  Timer? _timer;
  int _seconds = 0;
  bool _isRunning = false;

  // Goalscorers Tracking List
  List<Map<String, String>> goalScorers = [];
  final TextEditingController _playerNameController = TextEditingController();
  final TextEditingController _goalMinuteController = TextEditingController();
  late String selectedScorerTeam;

  @override
  void initState() {
    super.initState();
    homeTeam = widget.teamsList[0];
    awayTeam = widget.teamsList[1];
    selectedScorerTeam = homeTeam;
  }

  void _startTimer() {
    if (_isRunning) return;
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      setState(() {
        _seconds++;
      });
    });
    setState(() {
      _isRunning = true;
    });
  }

  void _pauseTimer() {
    _timer?.cancel();
    setState(() {
      _isRunning = false;
    });
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      _seconds = 0;
      _isRunning = false;
      goalScorers.clear();
      homeScore = 0;
      awayScore = 0;
    });
  }

  void _addGoalScorer() {
    if (_playerNameController.text.trim().isEmpty) return;
    setState(() {
      goalScorers.add({
        "team": selectedScorerTeam,
        "player": _playerNameController.text.trim(),
        "minute": _goalMinuteController.text.trim().isEmpty ? "${(_seconds ~/ 60)}'" : "${_goalMinuteController.text.trim()}'",
      });
      if (selectedScorerTeam == homeTeam) {
        homeScore++;
      } else {
        awayScore++;
      }
      _playerNameController.clear();
      _goalMinuteController.clear();
    });
  }

  void _removeGoalScorer(int index) {
    setState(() {
      var item = goalScorers[index];
      if (item["team"] == homeTeam) {
        if (homeScore > 0) homeScore--;
      } else {
        if (awayScore > 0) awayScore--;
      }
      goalScorers.removeAt(index);
    });
  }

  void _finishMatch() {
    _pauseTimer();
    widget.onMatchFinish(homeTeam, awayTeam, homeScore, awayScore);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$homeTeam ($homeScore - $awayScore) $awayTeam ပွဲရလဒ်ကို သိမ်းဆည်းပြီးပါပြီ!'),
        backgroundColor: Colors.green,
      ),
    );
  }

  String _formatTimeString(int totalSeconds) {
    int minutes = totalSeconds ~/ 60;
    int seconds = totalSeconds % 60;
    return "${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}";
  }

  @override
  void dispose() {
    _timer?.cancel();
    _playerNameController.dispose();
    _goalMinuteController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Live Match Control'),
        backgroundColor: Colors.green[800],
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Card(
              color: const Color(0xFF1E1E1E),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.timer, color: _isRunning ? Colors.red : Colors.grey, size: 20),
                        const SizedBox(width: 6),
                        Text(
                          _isRunning ? "LIVE - ${_formatTimeString(_seconds)}" : "PAUSED - ${_formatTimeString(_seconds)}",
                          style: TextStyle(
                            color: _isRunning ? Colors.red : Colors.orange,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 15),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: Column(
                            children: [
                              buildTeamLogo(homeTeam, widget.teamLogos, size: 40.0),
                              const SizedBox(height: 6),
                              Text(homeTeam, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(color: Colors.black45, borderRadius: BorderRadius.circular(8)),
                          child: Text(
                            '$homeScore - $awayScore',
                            style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.greenAccent),
                          ),
                        ),
                        Expanded(
                          child: Column(
                            children: [
                              buildTeamLogo(awayTeam, widget.teamLogos, size: 40.0),
                              const SizedBox(height: 6),
                              Text(awayTeam, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 15),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton.icon(
                  onPressed: _isRunning ? _pauseTimer : _startTimer,
                  icon: Icon(_isRunning ? Icons.pause : Icons.play_arrow),
                  label: Text(_isRunning ? 'Pause' : 'Start'),
                  style: ElevatedButton.styleFrom(backgroundColor: _isRunning ? Colors.orange : Colors.green),
                ),
                const SizedBox(width: 10),
                OutlinedButton.icon(
                  onPressed: _resetTimer,
                  icon: const Icon(Icons.refresh, color: Colors.redAccent),
                  label: const Text('Reset', style: TextStyle(color: Colors.redAccent)),
                ),
              ],
            ),
            const SizedBox(height: 15),

            // Goal Scorers Input Section
            Card(
              color: const Color(0xFF1E1E1E),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(" ဂိုးသွင်းသူ မှတ်တမ်းတင်ရန်", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.greenAccent)),
                    const SizedBox(height: 10),
                    DropdownButtonFormField<String>(
                      isExpanded: true,
                      value: selectedScorerTeam,
                      decoration: const InputDecoration(labelText: 'ဂိုးသွင်းသည့်အသင်း', border: OutlineInputBorder()),
                      items: [homeTeam, awayTeam].map((team) => DropdownMenuItem(value: team, child: Text(team, style: const TextStyle(fontSize: 12)))).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => selectedScorerTeam = val);
                      },
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          flex: 2,
                          child: TextField(
                            controller: _playerNameController,
                            decoration: const InputDecoration(labelText: 'ကစားသမား အမည်', border: OutlineInputBorder()),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          flex: 1,
                          child: TextField(
                            controller: _goalMinuteController,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(labelText: 'မိနစ် (ဥပမာ: 45)', border: OutlineInputBorder()),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _addGoalScorer,
                        icon: const Icon(Icons.sports_soccer, size: 16),
                        label: const Text('ဂိုးသွင်းချက် ထည့်မည် (+1 Goal)'),
                        style: ElevatedButton.styleFrom(backgroundColor: Colors.green[700]),
                      ),
                    ),
                    if (goalScorers.isNotEmpty) ...[
                      const Divider(color: Colors.grey, height: 20),
                      const Text("သွင်းဂိုးများစာရင်း:", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: goalScorers.length,
                        itemBuilder: (context, index) {
                          var goal = goalScorers[index];
                          return ListTile(
                            dense: true,
                            contentPadding: EdgeInsets.zero,
                            leading: const Icon(Icons.sports_soccer, color: Colors.greenAccent, size: 18),
                            title: Text("${goal['player']} (${goal['minute']})", style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                            subtitle: Text("${goal['team']}", style: const TextStyle(fontSize: 11, color: Colors.grey)),
                            trailing: IconButton(
                              icon: const Icon(Icons.delete, color: Colors.redAccent, size: 18),
                              onPressed: () => _removeGoalScorer(index),
                            ),
                          );
                        },
                      ),
                    ]
                  ],
                ),
              ),
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: _finishMatch,
                icon: const Icon(Icons.check_circle, color: Colors.white),
                label: const Text('ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)', style: TextStyle(color: Colors.white)),
                style: ElevatedButton.styleFrom(backgroundColor: Colors.blue[700]),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    isExpanded: true,
                    value: homeTeam,
                    decoration: const InputDecoration(labelText: 'Home Team', border: OutlineInputBorder()),
                    items: widget.teamsList.map((team) => DropdownMenuItem(value: team, child: Text(team, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12)))).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          homeTeam = value;
                          homeScore = 0;
                          selectedScorerTeam = homeTeam;
                          goalScorers.clear();
                        });
                      }
                    },
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    isExpanded: true,
                    value: awayTeam,
                    decoration: const InputDecoration(labelText: 'Away Team', border: OutlineInputBorder()),
                    items: widget.teamsList.map((team) => DropdownMenuItem(value: team, child: Text(team, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12)))).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          awayTeam = value;
                          awayScore = 0;
                          goalScorers.clear();
                        });
                      }
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- 2. Standings Screen ----------------
class StandingsScreen extends StatefulWidget {
  final List<Map<String, dynamic>> standingsData;
  final Map<String, String> teamLogos;
  final Function(List<Map<String, dynamic>>) onUpdate;

  const StandingsScreen({super.key, required this.standingsData, required this.teamLogos, required this.onUpdate});

  @override
  State<StandingsScreen> createState() => _StandingsScreenState();
}

class _StandingsScreenState extends State<StandingsScreen> {
  late String selectedTeam;
  final _pController = TextEditingController();
  final _wController = TextEditingController();
  final _dController = TextEditingController();
  final _lController = TextEditingController();
  final _gfController = TextEditingController();
  final _gaController = TextEditingController();

  @override
  void initState() {
    super.initState();
    selectedTeam = widget.standingsData[0]["team"];
    _loadTeamData(selectedTeam);
  }

  void _loadTeamData(String teamName) {
    final teamData = widget.standingsData.firstWhere((element) => element["team"] == teamName);
    _pController.text = teamData["p"].toString();
    _wController.text = teamData["w"].toString();
    _dController.text = teamData["d"].toString();
    _lController.text = teamData["l"].toString();
    _gfController.text = teamData["gf"].toString();
    _gaController.text = teamData["ga"].toString();
  }

  void _saveData() {
    int p = int.tryParse(_pController.text) ?? 0;
    int w = int.tryParse(_wController.text) ?? 0;
    int d = int.tryParse(_dController.text) ?? 0;
    int l = int.tryParse(_lController.text) ?? 0;
    int gf = int.tryParse(_gfController.text) ?? 0;
    int ga = int.tryParse(_gaController.text) ?? 0;
    int pts = (w * 3) + (d * 1);

    List<Map<String, dynamic>> updatedList = List.from(widget.standingsData);
    int index = updatedList.indexWhere((item) => item["team"] == selectedTeam);

    if (index != -1) {
      updatedList[index] = {"team": selectedTeam, "p": p, "w": w, "d": d, "l": l, "gf": gf, "ga": ga, "pts": pts};
      updatedList.sort((a, b) {
        int ptsCompare = b["pts"].compareTo(a["pts"]);
        if (ptsCompare != 0) return ptsCompare;
        int gdA = a["gf"] - a["ga"];
        int gdB = b["gf"] - b["ga"];
        return gdB.compareTo(gdA);
      });
      widget.onUpdate(updatedList);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$selectedTeam ၏ ဒေတာများကို ပြင်ဆင်ပြီးပါပြီ'), backgroundColor: Colors.green));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Admin Standings Control'), backgroundColor: Colors.purple[800], centerTitle: true),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("အမှတ်ပေးဇယား (Standings)", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columnSpacing: 10,
                columns: const [
                  DataColumn(label: Text('#')),
                  DataColumn(label: Text('Team')),
                  DataColumn(label: Text('P')),
                  DataColumn(label: Text('W')),
                  DataColumn(label: Text('D')),
                  DataColumn(label: Text('L')),
                  DataColumn(label: Text('GD')),
                  DataColumn(label: Text('PTS', style: TextStyle(fontWeight: FontWeight.bold))),
                ],
                rows: widget.standingsData.asMap().entries.map((entry) {
                  int idx = entry.key + 1;
                  var data = entry.value;
                  int gd = data["gf"] - data["ga"];
                  return DataRow(cells: [
                    DataCell(Text('$idx')),
                    DataCell(Row(children: [buildTeamLogo(data["team"], widget.teamLogos, size: 20.0), const SizedBox(width: 8), Text(data["team"], style: const TextStyle(fontWeight: FontWeight.w500))])),
                    DataCell(Text('${data["p"]}')),
                    DataCell(Text('${data["w"]}')),
                    DataCell(Text('${data["d"]}')),
                    DataCell(Text('${data["l"]}')),
                    DataCell(Text('$gd')),
                    DataCell(Text('${data["pts"]}', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.greenAccent))),
                  ]);
                }).toList(),
              ),
            ),
            const SizedBox(height: 20),
            const Divider(color: Colors.grey),
            const SizedBox(height: 10),
            const Text("အသင်း ဒေတာ စိတ်ကြိုက်ပြင်ရန် Form", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.purpleAccent)),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              isExpanded: true,
              value: selectedTeam,
              decoration: const InputDecoration(labelText: 'ပြင်ဆင်လိုသည့် အသင်း ရွေးပါ', border: OutlineInputBorder()),
              items: widget.standingsData.map((item) => DropdownMenuItem<String>(value: item["team"].toString(), child: Row(children: [buildTeamLogo(item["team"].toString(), widget.teamLogos, size: 20.0), const SizedBox(width: 8), Text(item["team"].toString())]))).toList(),
              onChanged: (value) { if (value != null) setState(() { selectedTeam = value; _loadTeamData(selectedTeam); }); },
            ),
            const SizedBox(height: 15),
            Row(
              children: [
                Expanded(child: TextField(controller: _pController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'P (ပွဲ)', border: OutlineInputBorder()))),
                const SizedBox(width: 8),
                Expanded(child: TextField(controller: _wController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'W (နိုင်)', border: OutlineInputBorder()))),
                const SizedBox(width: 8),
                Expanded(child: TextField(controller: _dController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'D (သရေ)', border: OutlineInputBorder()))),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: TextField(controller: _lController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'L (ရှုံး)', border: OutlineInputBorder()))),
                const SizedBox(width: 8),
                Expanded(child: TextField(controller: _gfController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'GF (သွင်းဂိုး)', border: OutlineInputBorder()))),
                const SizedBox(width: 8),
                Expanded(child: TextField(controller: _gaController, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'GA (ပေးဂိုး)', border: OutlineInputBorder()))),
              ],
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 45,
              child: ElevatedButton.icon(onPressed: _saveData, icon: const Icon(Icons.save), label: const Text('အချက်အလက်များ သိမ်းဆည်းမည်', style: TextStyle(fontSize: 15)), style: ElevatedButton.styleFrom(backgroundColor: Colors.purple[700])),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- 3. Fixtures Admin Screen ----------------
class FixturesAdminScreen extends StatefulWidget {
  final List<String> teamsList;
  final List<Map<String, dynamic>> fixturesList;
  final Function(List<Map<String, dynamic>>) onUpdateFixtures;

  const FixturesAdminScreen({super.key, required this.teamsList, required this.fixturesList, required this.onUpdateFixtures});

  @override
  State<FixturesAdminScreen> createState() => _FixturesAdminScreenState();
}

class _FixturesAdminScreenState extends State<FixturesAdminScreen> {
  late String homeTeam;
  late String awayTeam;
  final _scoreController = TextEditingController(text: "vs");
  String status = "ယှဉ်ပြိုင်မည်";

  @override
  void initState() {
    super.initState();
    homeTeam = widget.teamsList[0];
    awayTeam = widget.teamsList[1];
  }

  void _addFixture() {
    List<Map<String, dynamic>> newList = List.from(widget.fixturesList);
    newList.insert(0, {"home": homeTeam, "away": awayTeam, "score": _scoreController.text, "status": status});
    widget.onUpdateFixtures(newList);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ'), backgroundColor: Colors.blue));
  }

  void _removeFixture(int index) {
    List<Map<String, dynamic>> newList = List.from(widget.fixturesList);
    newList.removeAt(index);
    widget.onUpdateFixtures(newList);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Admin Fixtures Control'), backgroundColor: Colors.blue[800], centerTitle: true),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("ပွဲစဉ်များ စီမံရန် Form", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.blueAccent)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: DropdownButtonFormField<String>(isExpanded: true, value: homeTeam, decoration: const InputDecoration(labelText: 'Home', border: OutlineInputBorder()), items: widget.teamsList.map((t) => DropdownMenuItem(value: t, child: Text(t, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12)))).toList(), onChanged: (v) => setState(() => homeTeam = v!))),
                const SizedBox(width: 8),
                Expanded(child: DropdownButtonFormField<String>(isExpanded: true, value: awayTeam, decoration: const InputDecoration(labelText: 'Away', border: OutlineInputBorder()), items: widget.teamsList.map((t) => DropdownMenuItem(value: t, child: Text(t, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12)))).toList(), onChanged: (v) => setState(() => awayTeam = v!))),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: TextField(controller: _scoreController, decoration: const InputDecoration(labelText: 'အခြေအနေ/ရလဒ် (ဥပမာ: vs)', border: OutlineInputBorder()))),
                const SizedBox(width: 8),
                Expanded(child: DropdownButtonFormField<String>(value: status, decoration: const InputDecoration(labelText: 'Status', border: OutlineInputBorder()), items: const [DropdownMenuItem(value: "ယှဉ်ပြိုင်မည်", child: Text("ယှဉ်ပြိုင်မည်")), DropdownMenuItem(value: "ပြီးဆုံး", child: Text("ပြီးဆုံး"))], onChanged: (v) => setState(() => status = v!))),
              ],
            ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(onPressed: _addFixture, icon: const Icon(Icons.add), label: const Text('ပွဲစဉ် အသစ်ထည့်မည်'), style: ElevatedButton.styleFrom(backgroundColor: Colors.blue[700])),
            ),
            const SizedBox(height: 20),
            const Divider(color: Colors.grey),
            const SizedBox(height: 10),
            const Text("အားလုံးသော ပွဲစဉ်များစာရင်း", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: widget.fixturesList.length,
              itemBuilder: (context, index) {
                var item = widget.fixturesList[index];
                return Card(
                  color: const Color(0xFF1E1E1E),
                  margin: const EdgeInsets.symmetric(vertical: 4),
                  child: ListTile(
                    title: Text('${item["home"]} vs ${item["away"]}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    subtitle: Text('ရလဒ်: ${item["score"]} | အခြေအနေ: ${item["status"]}'),
                    trailing: IconButton(icon: const Icon(Icons.delete, color: Colors.redAccent), onPressed: () => _removeFixture(index)),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- 4. Upcoming Matches Screen ----------------
class UpcomingMatchesScreen extends StatelessWidget {
  final List<Map<String, dynamic>> fixturesList;
  final Map<String, String> teamLogos;

  const UpcomingMatchesScreen({super.key, required this.fixturesList, required this.teamLogos});

  @override
  Widget build(BuildContext context) {
    final upcomingList = fixturesList.where((item) => item["status"] == "ယှဉ်ပြိုင်မည်").toList();

    return Scaffold(
      appBar: AppBar(
        title: const Text('နောက်လာမည့်ပွဲစဉ်များ'),
        backgroundColor: Colors.teal[800],
        centerTitle: true,
      ),
      body: upcomingList.isEmpty
          ? const Center(child: Text('ယှဉ်ပြိုင်ရန် ကျန်ရှိသော ပွဲစဉ် မရှိသေးပါ။', style: TextStyle(color: Colors.grey, fontSize: 14)))
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: upcomingList.length,
              itemBuilder: (context, index) {
                var match = upcomingList[index];
                String home = match["home"];
                String away = match["away"];
                return Card(
                  color: const Color(0xFF1E1E1E),
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Column(
                            children: [
                              buildTeamLogo(home, teamLogos, size: 36.0),
                              const SizedBox(height: 6),
                              Text(home, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(color: Colors.teal.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                          child: const Text('VS', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.tealAccent, fontSize: 16)),
                        ),
                        Expanded(
                          child: Column(
                            children: [
                              buildTeamLogo(away, teamLogos, size: 36.0),
                              const SizedBox(height: 6),
                              Text(away, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
