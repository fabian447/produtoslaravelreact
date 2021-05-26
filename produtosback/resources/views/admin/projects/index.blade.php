@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>
                <div class="card-body">
					<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Nuevo</button>

					<table class="table table-dark mt-2">
						<thead>
						  <tr>
							<th scope="col">Nombre</th>
							<th scope="col">Etiquetas</th>
							<th scope="col">Descripcion</th>
							<th scope="col">URL</th>
							<th scope="col">Logo</th>
							<th scope="col">Imagen</th>
							<th scope="col">Opciones</th>
						  </tr>
						</thead>
						<tbody>
							@foreach ($projects as $project)

								<tr>
							
									<td>{{ $project->name }}</td>
									<td>{{ $project->tags }}</td>
									<td>{{ $project->description }}</td>
									<td>{{ $project->url }}</td>
									<td><img width="64px" src="{{ asset($project->logo)}}" alt=""></td>
									<td><img width="64px" src="{{ asset($project->image)}}" alt=""></td>
									<td><a class="btn btn-outline-warning mr-1" href="{{ route('projects.edit',$project->id)}}">Editar</a><a class="btn btn-outline-danger" href="{{ route('projects.destroy',$project->id)}}">Borrar</a></td>
								</tr>
								
							@endforeach
						 
						 
						</tbody>
					  </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" tabindex="-1" role="dialog" id="exampleModal">
	<div class="modal-dialog modal-lg" role="document">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title">Nuevo proyecto</h5>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		  </button>
		</div>
		<form action="{{ route('projects.store') }}" method="POST" enctype="multipart/form-data">
			@csrf
			<div class="modal-body">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Nombre</label>
							<input type="text" class="form-control" placeholder="Nombre del proyecto" name="name" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Etiquetas  <small class="text-danger">(Ingrese los elementos separados por comas)</small></label>
							<input type="text" class="form-control" placeholder="Etiquetas" name="tags" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Logo</label>
							<input type="file" class="form-control" placeholder="Logo del proyecto" name="logo" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Imagen</label>
							<input type="file" class="form-control" placeholder="Imagen del proyecto" name="image" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">URL</label>
							<input type="text" class="form-control" placeholder="URL del proyecto" name="url" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Color de fondo</label>
							<input type="color" class="form-control" placeholder="Color de fondo" name="background_color" required>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group">
							<label for="email">Color de texto</label>
							<input type="color" class="form-control" placeholder="Color de fondo" name="font_color" required>
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label for="email">Descripcion</label>
							<textarea class="form-control" name="description" rows="3" required></textarea>
						</div>
					</div>
				</div>

			</div>
		<div class="modal-footer">
		  <button type="submit" class="btn btn-primary">Guardar</button>
		  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
		</div>
		</form> 
	  </div>
	</div>
  </div>
@endsection
