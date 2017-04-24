import Inferno from 'Inferno';
import Component from 'inferno-component';
import axios from 'axios';

export default class BlogRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    if(this.props.userName) {
      axios.get(`http://tps-qgs.herokuapp.com/api/medium/feed/${this.props.userName}`)
      .then((request) => {
        this.setState({data: request.data});
      });
    }
  }

  _getPubDate(isoDate) {
    const date = new Date(isoDate);
    return date.getUTCFullYear()+'-'
      + (date.getUTCMonth()+1) +'-'
      + date.getUTCDate() +'T';
  }

  render() {
    if(this.state.data.length > 0) {

      return (
        <div className="row">
          <div className="small-12 columns blogroll">
            <h1>Blog</h1>
            {
              this.state.data.map((item) => {
                return (
                  <div className="blog-item">
                    <a href={item.link}><h3>{item.title}</h3></a>
                    <span>{this._getPubDate(item.pubDate)}</span>
                  </div>
                );
              })
            }
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}
