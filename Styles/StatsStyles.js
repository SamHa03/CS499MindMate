// Styles/StatsStyles.js
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e9f0f2',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  stat: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  fakeAxisLine: {
    left: 50,
    marginTop: -35,
    width: 1,
    height: '90%',
    backgroundColor: '#bebebe', // fake axis, since apparently I can't customize the real one
    zIndex: 1,
  },
  yAxisBackground: {
    position: 'absolute',
    left: -30,
    justifyContent: 'left',
    alignItems: 'left',
    width: 70,
    height: '110%',
    backgroundColor: '#e9f0f2', // same background as container to "whiteout" lines
    zIndex: 1,
  },
  yAxisContainer: {
    justifyContent: "space-evenly",
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal:-50,
    zIndex: 2,
    height: '175%',
  },
  yAxisLabel: {
    color: '#000',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    flexWrap: 'wrap',
    width: 70,
    marginLeft: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
});

export default styles;
