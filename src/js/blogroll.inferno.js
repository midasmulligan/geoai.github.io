import Inferno from 'Inferno';
import Component from 'inferno-component';
import axios from 'axios';

export default class BlogRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    }
  }

  componentDidMount() {
    if(this.props.userName) {
      axios.get(`https://tps-qgs.herokuapp.com/api/medium/feed/${this.props.userName}`)
      .then((request) => {
        this.setState({data: request.data});
      });
    }
  }

  render() {
    if(!this.state.data) {
      return null;
    }
    return (
      <div className="row blogroll">
        <h1 className="text-center">Updates</h1>
        <div className="blog-posts small-12 medium-6 columns small-centered">
          {
            this.state.data.map((item) => {
              return (
                <div className="blog-item">
                  <a href={item.link}><h3>{item.title}</h3></a>
                  <hr/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
