import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Item from './Item';

export default class ItemLister extends React.Component {
	constructor() {
  	super();
 		 this.state={items:[], hasMoreItems: true};
  }
  
  loadItems(page)
  {
	  var apiURL = 'http://localhost:3000/products?_limit=20&_page='+page;
	  fetch(apiURL)
 		.then(result=>result.json())
    .then(items=>{
		
			if(items.length > 0)
			{
				var stateItems = this.state.items;
				items.map((item, i) => {
					stateItems.push(item);
					return item;
				});
			
				this.setState({items : stateItems});
			}
			else
			{
				this.setState({hasMoreItems : false});
			}
		}
	)
  }
  
  render() {
	  const loader = <div className="loader">Loading ...</div>;
	  var items = [];
	  this.state.items.map((item, i) => {
            items.push(<Item item={item} index={i} />)
			return item;
        });
  	return(
    	<InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                <div className="tracks">
                    {items}
                </div>
            </InfiniteScroll>
   )
  }
}
