import React from 'react';
import NumberFormat from 'react-number-format';

export default class Item extends React.Component {
  render() {
	var date1 = new Date();
	var date2 = new Date(this.props.item.date);
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	var dateContent = diffDays + ' day ago';
	if(diffDays >= 7)
	{
		var week = Math.ceil(diffDays / 7);
		if(week === 1)
		{
			dateContent = week + ' week ago ' + this.props.item.date;
		}
		else
		{
			dateContent = week + ' weeks ago ' + this.props.item.date;
		}
	}
	else if(diffDays > 1)
	{
		dateContent = diffDays + ' days ago';
	}
	var price = this.props.item.price / 100; //Convertion for cent
	if(this.props.index > 10 && (this.props.index % 20) === 0)
	{
		var rnd = 'http://localhost:3000/ads/?r=' + Math.floor(Math.random()*1000);
		
		return (
		<div>
			<div className="col-md-12">
				<img className="ad" src={rnd} alt=""/>
			</div>
			<div className="col-md-3 product-box">
				<div className="text-center face" style={{fontSize:this.props.item.size}}>{this.props.item.face}</div>
				<p><strong>SKU:</strong> {this.props.item.id}</p>
				<p><strong>Price:</strong> <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
				<p><strong>Created On:</strong> {dateContent}</p>
			</div>
		</div>
		);
	}
	else
	{
		return (
			<div className="col-md-3 product-box">
			<div className="text-center face" style={{fontSize:this.props.item.size}}>{this.props.item.face}</div>
			<p><strong>SKU:</strong> {this.props.item.id}</p>
			<p><strong>Price:</strong> <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
			<p><strong>Created On:</strong> {dateContent}</p>
			</div>
		);
	}
  }
}