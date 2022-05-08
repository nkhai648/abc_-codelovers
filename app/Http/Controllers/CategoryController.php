<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Products;
use Elasticsearch\ClientBuilder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    protected $index;
    protected $client;
    protected $type;
    public function __construct() {
        $this->client = ClientBuilder::create()->build();
        $this->index = 'category';
        $this->type = '_doc';
        $exists = $this->client->indices()->exists(['index' => $this->index]);
        if(!$exists){
            $this->client->indices()->create(['index' => $this->index]);
        };
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'unique:categories']
        ]);
        $new_cat = Categories::create($request->all());
        return response()->json($new_cat, 200);
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
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function show(Categories $categories)
    {
        $data = Categories::orderBy('id', 'DESC')->get();
        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function edit(Categories $categories)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required']
        ]);
        $table = Categories::find($request->id);
        $table->name = $request->name;
        $table->save();
        return response()->json($table, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categories  $categories
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Categories $categories)
    {
        if($categories->products->count() > 0) {
            return response()->json('Delete fail', 500);

        }else {
            Categories::find($id)->delete();
            return response()->json('Deleted', 200);
        }
    }


}
