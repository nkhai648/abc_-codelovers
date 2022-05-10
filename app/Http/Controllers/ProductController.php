<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\Categories;
use App\Models\Colors;
use App\Models\Sizes;
use Elasticsearch\ClientBuilder;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $type;
    protected $index;
    protected $client;

    public function __construct() {
        $this->client = ClientBuilder::create()->build();
        $this->index = 'products';
        $this->type = '_doc';
        $exists = $this->client->indices()->exists(['index' => $this->index]);
        if(!$exists) {
            $this->client->indices()->create(['index' => $this->index]);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list_cat = Categories::orderBy('name', 'DESC')->select('id', 'name')->get();
        return response()->json($list_cat, 200);
    }
    public function get_color_name()
    {
        $list_color = Colors::orderBy('color_name', 'ASC')->select('id', 'color_name')->get();
        return response()->json($list_color, 200);
    }
    public function get_size_name()
    {
        $list_size = Sizes::orderBy('size_name', 'ASC')->select('id', 'size_name')->get();
        return response()->json($list_size, 200);
    }

    public function sort_color(Request $request) {
        $paginate = Products::where('color_id', $request->id)->paginate(3);
        $color = Colors::where('id', $request->id)->select('id','color_name')->get();
        return response()->json([
            'color' => $color,
            'paginate' => $paginate,
            'products' => $this->responseDataProduct($paginate)
        ], 200);
    }

    public function sort_size(Request $request) {
        $paginate = Products::where('size_id', $request->id)->paginate(3);
        $size = Sizes::where('id', $request->id)->select('id','size_name')->get();
        return response()->json([
            'size' => $size,
            'paginate' => $paginate,
            'products' => $this->responseDataProduct($paginate)
        ], 200);
    }

    public function sort_price(Request $request) {
        if($request->param == 'ascending') {
            $paginate = Products::orderBy('price', 'ASC')->paginate(3);
        }else {
            $paginate = Products::orderBy('price', 'DESC')->paginate(3);
        }
        return response()->json([
            'paginate' => $paginate,
            'products' => $this->responseDataProduct($paginate)
        ],200);
    }

    public function max_min_price(Request $request) {
        if($request->value == 'min') {
            $value = Products::orderBy('price', 'asc')->first();
            $maxmin = "Min";
        }else {
            $value = Products::orderBy('price', 'desc')->first();
            $maxmin = "Max";
        }
        $data = [];
        $color = Colors::find($value->color_id);
        $size = Sizes::find($value->color_id);
        $category = Categories::find($value->category_id);
        $data = [
            'id' => $value->id,
            'name' => $value->name,
            'price' => $value->price,
            'image' => $value->image,
            'data' => $maxmin,
            'color_name' => $color->color_name,
            'size_name' => $size->size_name,
            'category_name' => $category->name,
        ];
        return response()->json($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'price' => ['required', 'int'],
            'color_id' => ['required'],
            'size_id' => ['required'],
            'category_id' => ['required'],
        ]);
        if($request->hasFile('image')) {
            $fileName = time().'.'.$request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path('images'), $fileName);
            $product = new Products();
            $product->name = $request->name;
            $product->price = $request->price;
            $product->image = $fileName;
            $product->color_id = $request->color_id;
            $product->size_id = $request->size_id;
            $product->category_id = $request->category_id;
            if($product->save()) {
                return $this->createProductElastic($product->id);
            }
        }else {
            return response()->json([
                'message' => 'Create Error'
            ], 400);
        }
    }
    public function createProductElastic($id) {
        $product = Products::find($id);
        $color = Colors::find($product->color_id);
        $size = Sizes::find($product->size_id);
        $category = Categories::find($product->category_id);
        $params = [
            'index' => $this->index,
            'type' => $this->type,
            'id' => $product->id,
            'body' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $product->image,
                'color_id' => $product->color_id,
                'size_id' => $product->size_id,
                'category_id' => $product->category_id,
                'name_category' => $category->name,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];
        $params['body']['color_name'] = $color->color_name;
        $params['body']['size_name'] = $size->size_name;
        $this->client->create($params);
        return $params['body'];
    }

    public function search(Request $request) {
        if($request->search != '') {
            $params = [
                "index" => $this->index,
                "type" => $this->type,
                "body" => [
                    "query" => [
                        "bool" => [
                            "should" => [
                                ["match" => ["name" => $request->search]]
                            ]
                        ]
                    ]
                ]
            ];
            $result = $this->client->search($params);
            $total = $result['hits']['total']['value'] ?? '';
            $data = $result['hits']['hits'];
            $dataSource = [];
            foreach($data as $key => $item) {
                $dataSource[$key] = $item['_source'];
                $color = Colors::find($item['_source']['color_id']);
                $dataSource[$key]['color_name'] =  $color->color_name;
                $size = Sizes::find($item['_source']['size_id']);
                $dataSource[$key]['size_name'] =  $size->size_name;
            }
            return response()->json([
                'dataSearch' => $dataSource,
                'total' =>$total
            ], 200);
        }

    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(products $products)
    {   
        $products = Products::orderBy('id', 'desc')->paginate(3);
        return response()->json([
            'paginate' => $products,
            'color' => '',
            'products' => $this->responseDataProduct($products)
        ], 200);
    }

    public function responseDataProduct($products) {
        $result = [];
        $result['product'] = [];
        foreach($products as $key => $item) {
            $category = Categories::find($item->category_id);
            $color = Colors::find($item->color_id);
            $size = Sizes::find($item->size_id);
            $result['product'][$key]['id'] = $item->id;
            $result['product'][$key]['name'] = $item->name;
            $result['product'][$key]['price'] = $item->price;
            $result['product'][$key]['image'] = $item->image;
            $result['product'][$key]['color'] = $item->color_id;
            $result['product'][$key]['size'] = $item->size_id;
            $result['product'][$key]['name_category'] = $category->name;
            $result['product'][$key]['color_name'] = $color->color_name;
            $result['product'][$key]['size_name'] = $size->size_name;
            $result['product'][$key]['category_id'] = $item->category_id;
            $result['product'][$key]['created_at'] = $item->created_at;
            $result['product'][$key]['updated_at'] = $item->updated_at;
        }   
        return $result;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'price' => ['required'],
            'image' => ['required'],
        ]);
        $product = Products::find($request->id);
        if($request->hasFile('image')) {
            $fileName = time().'.'.$request->file('image')->getClientOriginalExtension();
            $request->file('image')->move(public_path('images'), $fileName);
            unlink("images/".$product->image);

        }else {
            $fileName = $product->image;
        }
        $product->name = $request->name;
        $product->price = $request->price;
        $product->image = $fileName;
        $product->color_id = $request->color_id;
        $product->size_id = $request->size_id;
        $product->category_id = $request->category_id;
        $product->save();
        $result = [];
        $category = Categories::find($product->category_id);
        $color = Colors::find($product->color_id);
        $size = Sizes::find( $product->size_id);
        $result['id'] = $request->id;
        $result['name'] = $request->name;
        $result['price'] = $request->price;
        $result['image'] = $product->image;
        $result['color'] = $request->color_id;
        $result['size'] = $request->size_id;
        $result['name_category'] = $category->name;
        $result['color_name'] = $color->color_name;
        $result['size_name'] = $size->size_name;
        $result['category_id'] = $request->category_id;
        $result['updated_at'] = now();
        return response()->json($result, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Products::find($id);
        $product->delete();
        $params = [
            'index' => $this->index,
            'id' => $product->id
        ];
        $this->client->delete($params);
        unlink("images/".$product->image);
        return response()->json('Deleted successfully', 200);
    }
}
