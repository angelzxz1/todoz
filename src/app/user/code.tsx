const Page = ({ params }: { params: { user: string } }) => {
	console.log(params);
	return <div>{params.user}</div>;
};

export default Page;
