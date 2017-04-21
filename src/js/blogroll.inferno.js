import Inferno from 'Inferno';
import Component from 'inferno-component';
import axios from 'axios';

export default class BlogRoll extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.userName) {
      axios.get(`https://medium.com/feed/@${this.props.userName}`, {
        headers: {'Content-Type': 'text/xml'}
      })
      .then((request) => {
        console.log(request.data);
      });
    }
  }

  render() {
    return (
      <div className="row">
        <h1>Blog</h1>
      </div>
    )
  }
}
