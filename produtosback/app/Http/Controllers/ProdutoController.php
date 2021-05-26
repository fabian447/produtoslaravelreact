<?php

namespace App\Http\Controllers;

use App\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $produtos = Produto::orderBy('serial_number', 'ASC')->get();
        return response()->json($produtos);
    }
   
    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'serial_number' => 'required',
            'name' => 'required',
            'heigth' => 'required',
            'length' => 'required',
            'width' => 'required',
            'weigth' => 'required',
        ]);
        $produto = Produto::create($request->all());
        return response()->json(['message'=> 'produto criado', 
        'produto' => $produto]);
    }
    /**
     * Display the specified resource.
     *
     * @param  AppProduto  $produto
     * @return IlluminateHttpResponse
     */
    public function show(Produto $produto)
    {
        return $produto;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  AppProduto  $produto
     * @return IlluminateHttpResponse
     */
    /**
     * Update the specified resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @param  AppProduto  $produto
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, Produto $produto)
    {
         $request->validate([
             'serial_number' => 'required',
             'name' => 'required',
             'heigth' => 'required',
             'length' => 'required',
             'width' => 'required',
             'weigth' => 'required',

         ]);
        $produto->serial_number = $request->serial_number;
        $produto->name = $request->name;
        $produto->heigth = $request->heigth;
        $produto->length = $request->length;
        $produto->width = $request->width;
        $produto->weigth = $request->weigth;

        $produto->save();
        
        return response()->json([
            'message' => 'produto updated!',
            'produto' => $produto
        ]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  AppProduto  $produto
     * @return IlluminateHttpResponse
     */
    public function destroy(Produto $produto)
    {
        $produto->delete();
        return response()->json([
            'message' => 'produto deleted'
        ]);
        
    }
}
